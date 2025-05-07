export interface UpdateCategoryByIdInput {
  id: string;
  icon_name: string;
  title: string;
  icon_color: string;
}

export interface UpdateCategoryByIdOutput {
  id: string;
  icon_name: string;
  title: string;
  icon_color: string;
  created_at: Date;
  updated_at: Date;
}
