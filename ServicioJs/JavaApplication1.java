public class JavaApplication1 {
    
    int x = 5 + 10;


    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int l;
    }
    public boolean validarNumero(String validarNum) {
        int num = 0;
        if (num == 0){
            return true;
        }else {
            System.out.println("* Favor Intentelo de nuevo: ");
            return false;
        }
    }
    public void Menu() {
        String yu;
        int yustring = 0;

        System.out.println("BIENVENIDO AL JUEGO DE");

        do {
            System.out.println("         MENU       ");
            System.out.println("1. lista de pokemones");
            System.out.println("2. Editar Pokemones");
            System.out.println("3. EMPEZAR BATALLA");
            System.out.println("4. Registro de las partidas");
            System.out.println("5. Lista de pokemones mas utilizados");
            break;
        } while (yustring <= 7);
    }
    double lis;
    public void lista() {
        // for que me sirve para recorrer la matriz y que la imprima 
        int primero = 6;
        int ultimo = 13;
        for (int i = 0; i < primero; i++) {
            for (int j = 6; j < ultimo; j++) {
                System.out.println();

            }
        }
        System.out.println("PARA QUE ESCOJER TUS POKEMONES, EMPIEZA BATALLA");
        System.out.println("");
    }
    public void registro() {
        String RJ1 = "vector", RJ2; 
        // imprimo la matriz del registro eseptuando posiciones que no me sirven 
        for (int i = 0; i < 15 + 2*3; i++) {
            for (int j = 0; j < 34; j++) {
                if(RJ1 != "matriz" && j != 11 && j != 12 && j != 15 && j != 16 && j != 17 && j != 18) {
                    System.out.print(RJ1 + "\t");
                }
            }
            System.out.println("");
        }
        System.out.println("");
    } 
    public void elmio(String h, int ho){
        boolean continuar = true;
        while(continuar){
            for (int i = 0; i < 15; i++) {
                System.out.print(i + "," + "\t");
                continue; 
            }
            continuar = false;
        }
    }
    public char el(boolean a){
        char hh = 'j';
        if(hh*10+8+11+4-6-8)
        {
            return 'i';
        }else if(hh == 10+5){
            return 'k';
        }else{
            double mira = 0.1;
        }
        return hh;
    }
}

