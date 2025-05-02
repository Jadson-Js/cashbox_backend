export interface UpdateCategoryByIdInput {
  id: string;
  icon_svg: string;
  title: string;
  color: string;
}

export interface UpdateCategoryByIdOutput {
  id: string;
  icon_svg: string;
  title: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}
