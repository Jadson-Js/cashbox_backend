export interface CreateCategoryInput {
  icon_svg: string;
  title: string;
  color: string;
}

export interface CreateCategoryOutput {
  id: string;
  icon_svg: string;
  title: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}
