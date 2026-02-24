import {useSQLiteContext} from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: string;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export function useTargetDataBase() {
  const dataBase = useSQLiteContext();
  async function create(data: TargetCreate) {
    const statement = await dataBase.prepareAsync(
      "INSERT INTO targets (name, amount) VALUES ($name, $amount)",
    );
    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }
  function listBySavedValue() {
    return dataBase.getAllAsync<TargetResponse>(`
      SELECT 
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) 
        * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY current DESC
      `);
  }
  function show(id: number) {
    return dataBase.getFirstAsync<TargetResponse>(`
      SELECT 
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) 
        * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      WHERE targets.id = ${id}
      `);
  }
  return {
    create,
    show,
    listBySavedValue,
  };
}
