/// <reference types="react" />
type NestedKeyOf<TData> = {
    [Key in keyof TData & (string | number)]: TData[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<TData[Key]>}`
        : `${Key}`;
}[keyof TData & (string | number)];
export interface ItemTypeValue<TData> {
    label: string | React.ReactNode;
    accessorKey: NestedKeyOf<TData>;
}
export interface ItemTypeCell<TData> {
    label: string | React.ReactNode;
    cell: (data: TData) => React.ReactNode;
}
export interface ItemGroup<TData> {
    title: string | React.ReactNode;
    items: (ItemTypeValue<TData> | ItemTypeCell<TData>)[];
}
export type ReturnTypeDef<TData, K> = K extends "item"
    ? (ItemTypeValue<TData> | ItemTypeCell<TData>)[]
    : K extends "group"
      ? ItemGroup<TData>[]
      : unknown[];
export default function useSourceDetail<TData, TDataGroupType = "item" | "group">(
    definition: ReturnTypeDef<TData, TDataGroupType>,
): ReturnTypeDef<TData, TDataGroupType>;
export {};
