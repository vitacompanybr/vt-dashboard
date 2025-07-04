export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chatbot_configs: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          empresa_id: string | null
          id: string
          nome: string
          personalidade: Json | null
          prompt_sistema: string
          updated_at: string | null
          workflows: Json | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          empresa_id?: string | null
          id?: string
          nome: string
          personalidade?: Json | null
          prompt_sistema: string
          updated_at?: string | null
          workflows?: Json | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          empresa_id?: string | null
          id?: string
          nome?: string
          personalidade?: Json | null
          prompt_sistema?: string
          updated_at?: string | null
          workflows?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_configs_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      comentarios: {
        Row: {
          autor: string | null
          conteudo_id: string | null
          created_at: string | null
          id: string
          resolvido: boolean | null
          texto: string
          tipo: string
        }
        Insert: {
          autor?: string | null
          conteudo_id?: string | null
          created_at?: string | null
          id?: string
          resolvido?: boolean | null
          texto: string
          tipo?: string
        }
        Update: {
          autor?: string | null
          conteudo_id?: string | null
          created_at?: string | null
          id?: string
          resolvido?: boolean | null
          texto?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_autor_fkey"
            columns: ["autor"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comentarios_conteudo_id_fkey"
            columns: ["conteudo_id"]
            isOneToOne: false
            referencedRelation: "conteudos"
            referencedColumns: ["id"]
          },
        ]
      }
      conteudos: {
        Row: {
          agendamento: string | null
          arquivos: string[] | null
          created_at: string | null
          criado_por: string | null
          descricao: string | null
          empresa_id: string | null
          id: string
          plataformas: string[] | null
          status: string
          tipo: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          agendamento?: string | null
          arquivos?: string[] | null
          created_at?: string | null
          criado_por?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          plataformas?: string[] | null
          status?: string
          tipo: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          agendamento?: string | null
          arquivos?: string[] | null
          created_at?: string | null
          criado_por?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          plataformas?: string[] | null
          status?: string
          tipo?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conteudos_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conteudos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          configuracoes: Json | null
          created_at: string | null
          id: string
          nome: string
          plano: string
          updated_at: string | null
        }
        Insert: {
          configuracoes?: Json | null
          created_at?: string | null
          id?: string
          nome: string
          plano?: string
          updated_at?: string | null
        }
        Update: {
          configuracoes?: Json | null
          created_at?: string | null
          id?: string
          nome?: string
          plano?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          canal: string
          created_at: string | null
          email: string | null
          empresa_id: string | null
          id: string
          nome: string
          observacoes: string | null
          score: number | null
          status: string
          telefone: string
          ultima_interacao: string | null
          updated_at: string | null
        }
        Insert: {
          canal: string
          created_at?: string | null
          email?: string | null
          empresa_id?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          score?: number | null
          status?: string
          telefone: string
          ultima_interacao?: string | null
          updated_at?: string | null
        }
        Update: {
          canal?: string
          created_at?: string | null
          email?: string | null
          empresa_id?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          score?: number | null
          status?: string
          telefone?: string
          ultima_interacao?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          empresa_id: string | null
          id: string
          nome: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          empresa_id?: string | null
          id?: string
          nome: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          empresa_id?: string | null
          id?: string
          nome?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
