export interface Member {
  member_id: number;
  first_name: string;
  last_name: string;
  role: string;
  biography?: string;
  specialties?: string;
  portfolio_links?: string;
  contact_email: string;
  is_active: boolean;
  created_at: Date;
}

export interface Event {
  event_id: number;
  event_name: string;
  event_date: Date;
  event_description: string;
  start_date?: Date;
  end_date?: Date;
  venue?: string;
  is_published: boolean;
  created_by_member_id: number;
}

export interface ContentItem {
  content_id: number;
  event_id: number;
  member_id: number;
  content_type: 'PHOTO' | 'REPORT';
  title?: string;
  content_path: string;
  coverage_stage?: string;
  published_at: Date;
}

export interface EventCategory {
  category_id: number;
  category_name: string;
  category_slug: string;
}

export interface AdminReporting {
  report_id: number;
  report_type: string;
  report_data: string;
  generated_at: Date;
  accessible_by_admin_only: boolean;
}
