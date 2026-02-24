import {useSQLiteContext} from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: string;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  percentage: number;
  created_at: Date;
  update_at: Date;
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
        targets.amount
      FROM targets  
      `);
  }
  return {
    create,
    listBySavedValue,
  };
}
