export interface UpdateCategoryInput {
  id: string;
  icon_svg: string;
  title: string;
  color: string;
}

export interface UpdateCategoryOutput {
  id: string;
  icon_svg: string;
  title: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}
