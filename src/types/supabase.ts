export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number | null;
          category_id: string | null;
          material: string | null;
          dimensions: string | null;
          weight: string | null;
          colors: string[] | null;
          stock_status: 'in_stock' | 'out_of_stock' | 'made_to_order' | 'low_stock';
          images: string[] | null;
          video_url: string | null;
          sku: string | null;
          handmade_time: string | null;
          is_customizable: boolean;
          is_featured: boolean;
          is_new: boolean;
          is_bestseller: boolean;
          is_published: boolean;
          meta_title: string | null;
          meta_description: string | null;
          search_vector: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_name: string;
          review_text: string;
          rating: number | null;
          product_id: string | null;
          reviewer_image: string | null;
          review_image: string | null;
          platform: 'whatsapp' | 'instagram' | 'in_person' | 'other';
          is_featured: boolean;
          review_date: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      custom_order_requests: {
        Row: {
          id: string;
          description: string;
          occasion: string | null;
          for_whom: string | null;
          budget_range: string | null;
          deadline: string | null;
          materials: string[] | null;
          reference_url: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          status: 'pending' | 'in_progress' | 'completed' | 'declined';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
      };
    };
  };
};
