export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          category: string
          content: string | null
          cover_image_url: string | null
          created_at: string | null
          geo_metadata: Json | null
          id: string
          published_at: string | null
          slug: string
          source_agency: string | null
          source_origin: string | null
          status: string | null
          sub_category: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category: string
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          geo_metadata?: Json | null
          id?: string
          published_at?: string | null
          slug: string
          source_agency?: string | null
          source_origin?: string | null
          status?: string | null
          sub_category?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          geo_metadata?: Json | null
          id?: string
          published_at?: string | null
          slug?: string
          source_agency?: string | null
          source_origin?: string | null
          status?: string | null
          sub_category?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      data_merchants: {
        Row: {
          contact_email: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          last_publish_at: string | null
          logo_url: string | null
          name: string
          product_count: number | null
          rating: number | null
          service_type: string | null
          tags: string[] | null
          transaction_count: number | null
          updated_at: string | null
          verification_status: boolean | null
          website_url: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          last_publish_at?: string | null
          logo_url?: string | null
          name: string
          product_count?: number | null
          rating?: number | null
          service_type?: string | null
          tags?: string[] | null
          transaction_count?: number | null
          updated_at?: string | null
          verification_status?: boolean | null
          website_url?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          last_publish_at?: string | null
          logo_url?: string | null
          name?: string
          product_count?: number | null
          rating?: number | null
          service_type?: string | null
          tags?: string[] | null
          transaction_count?: number | null
          updated_at?: string | null
          verification_status?: boolean | null
          website_url?: string | null
        }
        Relationships: []
      }
      data_products: {
        Row: {
          content: string | null
          created_at: string | null
          currency: string | null
          data_format: string | null
          data_volume: string | null
          delivery_method: string | null
          download_count: number | null
          external_source_id: string | null
          id: string
          metadata: Json | null
          price: number | null
          provider_id: string
          published_at: string | null
          resource_url: string | null
          slug: string
          source_origin: string | null
          status: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          currency?: string | null
          data_format?: string | null
          data_volume?: string | null
          delivery_method?: string | null
          download_count?: number | null
          external_source_id?: string | null
          id?: string
          metadata?: Json | null
          price?: number | null
          provider_id: string
          published_at?: string | null
          resource_url?: string | null
          slug: string
          source_origin?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          currency?: string | null
          data_format?: string | null
          data_volume?: string | null
          delivery_method?: string | null
          download_count?: number | null
          external_source_id?: string | null
          id?: string
          metadata?: Json | null
          price?: number | null
          provider_id?: string
          published_at?: string | null
          resource_url?: string | null
          slug?: string
          source_origin?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "data_products_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "data_merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          attendees_count: number | null
          cover_image_url: string | null
          created_at: string | null
          details: string | null
          end_date: string | null
          event_date: string
          event_type: string | null
          id: string
          location: string | null
          registration_link: string | null
          status: string | null
          status_text: string | null
          title: string
        }
        Insert: {
          attendees_count?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          details?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          location?: string | null
          registration_link?: string | null
          status?: string | null
          status_text?: string | null
          title: string
        }
        Update: {
          attendees_count?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          details?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          location?: string | null
          registration_link?: string | null
          status?: string | null
          status_text?: string | null
          title?: string
        }
        Relationships: []
      }
      insights: {
        Row: {
          author_avatar_url: string | null
          author_name: string
          author_role: string | null
          created_at: string | null
          display_order: number | null
          id: string
          quote: string
          status: string | null
          tags: string[] | null
          topic: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_avatar_url?: string | null
          author_name: string
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          quote: string
          status?: string | null
          tags?: string[] | null
          topic?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          quote?: string
          status?: string | null
          tags?: string[] | null
          topic?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      platform_stats: {
        Row: {
          geo_metadata: Json | null
          id: number
          label: string | null
          metric_key: string
          metric_value: number | null
          updated_at: string | null
        }
        Insert: {
          geo_metadata?: Json | null
          id?: number
          label?: string | null
          metric_key: string
          metric_value?: number | null
          updated_at?: string | null
        }
        Update: {
          geo_metadata?: Json | null
          id?: number
          label?: string | null
          metric_key?: string
          metric_value?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_profile: {
        Args: { full_name: string; new_role: string; user_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
