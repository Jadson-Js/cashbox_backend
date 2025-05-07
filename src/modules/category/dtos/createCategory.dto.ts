export interface CreateCategoryInput {
  icon_name: string;
  title: string;
  icon_color: string;
}

export interface CreateCategoryOutput {
  id: string;
  icon_name: string;
  title: string;
  icon_color: string;
  created_at: Date;
  updated_at: Date;
}
