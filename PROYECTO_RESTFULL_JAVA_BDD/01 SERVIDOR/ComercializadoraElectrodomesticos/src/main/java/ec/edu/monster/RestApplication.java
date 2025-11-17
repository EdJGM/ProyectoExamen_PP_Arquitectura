/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class RestApplication extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        
        // Agregar los controladores
        resources.add(ec.edu.monster.controller.ElectrodomesticoController.class);
        resources.add(ec.edu.monster.controller.FacturacionController.class);
        
        return resources;
    }
}