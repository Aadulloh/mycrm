export interface Room {
  id?: number;
  branchId: number;
  name: string;
  capacity: number;
}

export interface RoomModalProps {
  open: boolean;
  toggle: () => void;
  update: Room | null;
  mode: "create" | "update";
}