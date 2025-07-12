<?php

require_once __DIR__ . "/../../models/academic";

class   VirtualUserService{

    private $virtualUser;

    public function __construct(VirtualUser $virtualUser){
        $this->virtualUser = $virtualUser;

    }

   public function insertVirtualUser(VirtualUser $user): bool {
        // Asignar propiedades (si es necesario)
        $this->virtualUser->id = $user->id;
        $this->virtualUser->email = $user->email;
        $this->virtualUser->password = $user->password;
        
        // Aquí deberías agregar la lógica para insertar en la base de datos
        // Por ejemplo:
        // return $this->virtualUser->save();
        
        // Retorno temporal (deberías implementar la lógica real)
        return true;
    }


}