/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dao;

import ec.edu.monster.model.Electrodomestico;
import ec.edu.monster.util.DatabaseConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class ElectrodomesticoDAO {
    
    // Listar todos los electrodomésticos disponibles
    public List<Electrodomestico> listarTodos() {
        List<Electrodomestico> lista = new ArrayList<>();
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "SELECT * FROM electrodomestico WHERE estado = 'DISPONIBLE' ORDER BY nombre";
            PreparedStatement pst = conn.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                Electrodomestico electro = new Electrodomestico();
                electro.setIdElectrodomestico(rs.getInt("id_electrodomestico"));
                electro.setCodigo(rs.getString("codigo"));
                electro.setNombre(rs.getString("nombre"));
                electro.setDescripcion(rs.getString("descripcion"));
                electro.setMarca(rs.getString("marca"));
                electro.setPrecioVenta(rs.getDouble("precio_venta"));
                electro.setStock(rs.getInt("stock"));
                electro.setEstado(rs.getString("estado"));
                lista.add(electro);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return lista;
    }
    
    // Obtener por ID
    public Electrodomestico obtenerPorId(int id) {
        Connection conn = null;
        Electrodomestico electro = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "SELECT * FROM electrodomestico WHERE id_electrodomestico = ?";
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setInt(1, id);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                electro = new Electrodomestico();
                electro.setIdElectrodomestico(rs.getInt("id_electrodomestico"));
                electro.setCodigo(rs.getString("codigo"));
                electro.setNombre(rs.getString("nombre"));
                electro.setDescripcion(rs.getString("descripcion"));
                electro.setMarca(rs.getString("marca"));
                electro.setPrecioVenta(rs.getDouble("precio_venta"));
                electro.setStock(rs.getInt("stock"));
                electro.setEstado(rs.getString("estado"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return electro;
    }
    
    // Crear nuevo electrodoméstico
    public boolean crear(Electrodomestico electro) {
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "INSERT INTO electrodomestico (codigo, nombre, descripcion, marca, " +
                        "precio_venta, stock, estado) VALUES (?, ?, ?, ?, ?, ?, ?)";
            
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, electro.getCodigo());
            pst.setString(2, electro.getNombre());
            pst.setString(3, electro.getDescripcion());
            pst.setString(4, electro.getMarca());
            pst.setDouble(5, electro.getPrecioVenta());
            pst.setInt(6, electro.getStock());
            pst.setString(7, electro.getEstado());
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
    }
    
    // Actualizar electrodoméstico
    public boolean actualizar(Electrodomestico electro) {
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "UPDATE electrodomestico SET codigo=?, nombre=?, descripcion=?, " +
                        "marca=?, precio_venta=?, stock=?, estado=? WHERE id_electrodomestico=?";
            
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, electro.getCodigo());
            pst.setString(2, electro.getNombre());
            pst.setString(3, electro.getDescripcion());
            pst.setString(4, electro.getMarca());
            pst.setDouble(5, electro.getPrecioVenta());
            pst.setInt(6, electro.getStock());
            pst.setString(7, electro.getEstado());
            pst.setInt(8, electro.getIdElectrodomestico());
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
    }
    
    // Eliminar (cambiar estado)
    public boolean eliminar(int id) {
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "UPDATE electrodomestico SET estado='INACTIVO' WHERE id_electrodomestico=?";
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setInt(1, id);
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
    }
}
