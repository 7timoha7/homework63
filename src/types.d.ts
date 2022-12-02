export interface BlogType {
  title: string;
  desc: string;
  time: string;
  id: string;
}

export type BlogApi = Omit<BlogType, 'id'>;