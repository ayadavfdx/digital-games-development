    // a91403
    // Fernando Davila

    let hotbar = ["Espada", "Arco", "Poção"];

    function itemNoSlot(barra, slot){
        var lista = barra;
        var index = slot;

        if(index >= lista.length){
            return "Slot vazio";
        }else{
            return lista[index];
        }
    }
    
    function trocarItem(barra, slot, novoItem){
        var array = barra;
        var index = slot;
        var novoitem = array[index];
        
        novoitem = novoItem;
        console.log("Slot" + slot + ":" + itemNoSlot(barra, slot),
        "-> " + novoItem
        );
    }

    console.log(itemNoSlot(hotbar,0));
    console.log(itemNoSlot(hotbar, 5));
    trocarItem(hotbar, 1, "Machado");
    console.log(hotbar.length);