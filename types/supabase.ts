export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clase: {
        Row: {
          descripcion: string | null;
          fecha_fin: string | null;
          fecha_inicio: string | null;
          hora_fin: string | null;
          hora_inicio: string | null;
          id: number;
          id_empleado: string | null;
        };
        Insert: {
          descripcion?: string | null;
          fecha_fin?: string | null;
          fecha_inicio?: string | null;
          hora_fin?: string | null;
          hora_inicio?: string | null;
          id?: number;
          id_empleado?: string | null;
        };
        Update: {
          descripcion?: string | null;
          fecha_fin?: string | null;
          fecha_inicio?: string | null;
          hora_fin?: string | null;
          hora_inicio?: string | null;
          id?: number;
          id_empleado?: string | null;
        };
      };
      clientes: {
        Row: {
          apellidos: string | null;
          avatar_url: string | null;
          email: string | null;
          id: string;
          nombre: string | null;
          telefono: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          apellidos?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          id: string;
          nombre?: string | null;
          telefono?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          apellidos?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          id?: string;
          nombre?: string | null;
          telefono?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
      };
      detalle_venta: {
        Row: {
          cantidad: number | null;
          id: number;
          id_producto: number | null;
          id_venta: number | null;
          subtotal: number | null;
        };
        Insert: {
          cantidad?: number | null;
          id?: number;
          id_producto?: number | null;
          id_venta?: number | null;
          subtotal?: number | null;
        };
        Update: {
          cantidad?: number | null;
          id?: number;
          id_producto?: number | null;
          id_venta?: number | null;
          subtotal?: number | null;
        };
      };
      empleados: {
        Row: {
          apellido_m: string | null;
          apellido_p: string | null;
          avatar_url: string | null;
          direccion: string | null;
          email: string | null;
          id: string;
          nombre: string | null;
          num_seguro: string | null;
          telefono: string | null;
          tipo_empleado: number | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          apellido_m?: string | null;
          apellido_p?: string | null;
          avatar_url?: string | null;
          direccion?: string | null;
          email?: string | null;
          id: string;
          nombre?: string | null;
          num_seguro?: string | null;
          telefono?: string | null;
          tipo_empleado?: number | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          apellido_m?: string | null;
          apellido_p?: string | null;
          avatar_url?: string | null;
          direccion?: string | null;
          email?: string | null;
          id?: string;
          nombre?: string | null;
          num_seguro?: string | null;
          telefono?: string | null;
          tipo_empleado?: number | null;
          updated_at?: string | null;
          username?: string | null;
        };
      };
      inscripciones: {
        Row: {
          id: number;
          id_clase: number | null;
          id_cliente: string | null;
        };
        Insert: {
          id?: number;
          id_clase?: number | null;
          id_cliente?: string | null;
        };
        Update: {
          id?: number;
          id_clase?: number | null;
          id_cliente?: string | null;
        };
      };
      membresia: {
        Row: {
          codigo_membresia: string | null;
          estado_membresia: string | null;
          fecha_activacion: string | null;
          id: number;
          id_cliente: string | null;
          id_tipo_membresia: number | null;
        };
        Insert: {
          codigo_membresia?: string | null;
          estado_membresia?: string | null;
          fecha_activacion?: string | null;
          id?: number;
          id_cliente?: string | null;
          id_tipo_membresia?: number | null;
        };
        Update: {
          codigo_membresia?: string | null;
          estado_membresia?: string | null;
          fecha_activacion?: string | null;
          id?: number;
          id_cliente?: string | null;
          id_tipo_membresia?: number | null;
        };
      };
      producto: {
        Row: {
          costo: number | null;
          feche_caducidad: string | null;
          id: number;
          inventario_actual: string | null;
          inventario_incial: number | null;
          precio_venta: number | null;
          nombre: string | null;
        };
        Insert: {
          costo?: number | null;
          feche_caducidad?: string | null;
          id?: number;
          inventario_actual?: string | null;
          inventario_incial?: number | null;
          precio_venta?: number | null;
          nombre?: string | null;
        };
        Update: {
          costo?: number | null;
          feche_caducidad?: string | null;
          id?: number;
          inventario_actual?: string | null;
          inventario_incial?: number | null;
          precio_venta?: number | null;
          nombre?: string | null;
        };
      };
      tipo_empleado: {
        Row: {
          descripcion: string | null;
          id_tipo_empleado: number;
        };
        Insert: {
          descripcion?: string | null;
          id_tipo_empleado?: number;
        };
        Update: {
          descripcion?: string | null;
          id_tipo_empleado?: number;
        };
      };
      tipo_membresia: {
        Row: {
          url_imagen: string | undefined;
          descripcion: string | null;
          id: number;
        };
        Insert: {
          descripcion?: string | null;
          id?: number;
        };
        Update: {
          descripcion?: string | null;
          id?: number;
        };
      };
      user_roles: {
        Row: {
          id: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
        };
      };
      venta: {
        Row: {
          fecha_venta: string | null;
          id: number;
          id_cliente: string | null;
          id_empleado: string | null;
          total: number | null;
        };
        Insert: {
          fecha_venta?: string | null;
          id?: number;
          id_cliente?: string | null;
          id_empleado?: string | null;
          total?: number | null;
        };
        Update: {
          fecha_venta?: string | null;
          id?: number;
          id_cliente?: string | null;
          id_empleado?: string | null;
          total?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_read_product: {
        Args: {
          employee_id: string;
        };
        Returns: boolean;
      };
      es_empleado: {
        Args: {
          employee_id: string | undefined;
        };
        Returns: boolean;
      };
      es_instructor: {
        Args: {
          employee_id: string;
        };
        Returns: boolean;
      };
      obtener_clases_inscripciones: {
        Args: Record<PropertyKey, never>;
        Returns: {
          clase_id: number;
          clase_descripcion: string;
          cantidad: number;
        }[];
      };

      obtener_clientes_inscritos: {
        Args: Record<PropertyKey, never>;
        Returns: {
          clase_id: number;
          clase_descripcion: string;
          cliente_nombre: string;
          cliente_apellidos: string;
          cliente_telefono: string;
        }[];
      };
      obtener_clientes_inscritos_por_empleado: {
        Args: {
          p_empleado_id: string;
        };
        Returns: {
          clase_id: number;
          clase_descripcion: string;
          cliente_nombre: string;
          cliente_apellidos: string;
          cliente_telefono: string;
        }[];
      };
      obtener_membresias_por_tipo: {
        Args: Record<PropertyKey, never>;
        Returns: {
          tipo_membresia_nombre: string;
          cantidad: number;
        }[];
      };
      obtener_membresias_por_tipo_mes_anio: {
        Args: {
          mes: number;
          anio: number;
        };
        Returns: {
          tipo_membresia_nombre: string;
          cantidad: number;
        }[];
      };

      obtener_productos_mas_vendidos: {
        Args: {
          mes: number;
          anio: number;
        };
        Returns: {
          id_producto: number;
          nombre: string;
          cantidad_vendida: number;
        }[];
      };

      obtener_productos_menos_vendidos: {
        Args: {
          mes: number;
          anio: number;
        };
        Returns: {
          id_producto: number;
          nombre: string;
          cantidad_vendida: number;
        }[];
      };
    };

    Enums: {
      app_role: "cliente" | "empleado";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
