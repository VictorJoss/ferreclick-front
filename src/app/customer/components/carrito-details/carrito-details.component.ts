import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from "../customer-navbar/navbar.component";
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-carrito-details',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './carrito-details.component.html',
  styleUrl: './carrito-details.component.css'
})
export class CarritoDetailsComponent  implements OnInit{

  // variable para guardar el carrito
  carrito:any = [];

  constructor(private carritoService:CarritoService){}

  // se carga el carrito al iniciar el componente
  ngOnInit(): void {
    this.cargarCarrito();
  }

  // metodo para incrementar la cantidad de un producto
  incrementarCantidad(id:any): void {
    this.carrito.find(producto => producto.product.producId == id).quantity++;
    const quantity = this.carrito.find(producto => producto.product.producId == id).quantity;
    this.agregarAlCarrito(id, quantity);
  }

  // metodo para decrementar la cantidad de un producto
  decrementarCantidad(id:any): void {
    if (this.carrito.find(producto => producto.product.producId == id).quantity > 1) {
      this.carrito.find(producto => producto.product.producId == id).quantity--;
      const quantity = this.carrito.find(producto => producto.product.producId == id).quantity;
      this.agregarAlCarrito(id, quantity);
    }
  }

  // metodo para cambiar la cantidad de un producto
  cambiarCantidad(event: Event, id:any): void {
    const input = event.target as HTMLInputElement;
    const valor = parseInt(input.value, 10);

    // Validación para evitar valores negativos o no numéricos
    this.carrito.find(producto => producto.id == id).cantidad = isNaN(valor) || valor < 1 ? 1 : valor;
  }

  // metodo para calcular el total de un producto
  calcularTotal(precio:number, cantidad:number):number{
    return precio * cantidad;
  }

  // METODO PARA AGREGAR AL CARRITO
  agregarAlCarrito(productId:any, quantity:any):void{
    const carritoDto = {
      userId: UserStorageService.getUserId(),
      productId,
      quantity
    }

    this.carritoService.addCarrito(carritoDto).subscribe({
      next: (response) => {
      },
      error: (err) => {
        console.error("Error al agregar producto al carrito:", err);
      }
    });
  }

  // METODO PARA OBTENER EL CARRITO
  cargarCarrito():void{
    // Obtener el userId desde el UserStorageService
    const userId = UserStorageService.getUserId();
    if (userId) {
      // Llamar al servicio para obtener el carrito por ID de usuario
      this.carritoService.getCartByUserId(userId).subscribe({
        next: (carritoData) => {
          // Guardar los datos del carrito en la variable
          this.carrito = carritoData;
          this.carrito = this.carrito.cartItems;
        },
        error: (err) => {
          console.error('Error al obtener el carrito:', err);
        }
      });
    }
  }

  // METODO PARA OBTENER EL TOTAL DEL CARRITO
  precioTotalCarrito():number{
    let total:number = 0
    this.carrito.forEach(e => {
      const precioProducto = e.product.price;
      const productoCantidad = e.quantity;
      const totalProducto = precioProducto * productoCantidad;
      total = total + totalProducto;
    });

    return total;
  }

  // CALCULAR IVA
  totalIVA():number{
    return this.precioTotalCarrito() * 0.19;
  }

  // BORRAR ELEMENTO
  borrarItem(id: number): void {
    const userId = UserStorageService.getUserId();
    if (userId) {
      this.carritoService.removeCartByUserId(userId, id).subscribe({
        next: () => {
          // Filtra el carrito para eliminar el elemento borrado
          this.carrito = this.carrito.filter((item: any) => item.product.producId !== id);
        },
        error: (err) => {
          console.error('Error al borrar el producto del carrito:', err);
        }
      });
    }
  }

  // BORRAR TODO EL CARRITO
  borrarTodoElCarrito():void{
    const userId = UserStorageService.getUserId();
    if(userId){
      this.carritoService.removeAllCartByUserId(userId).subscribe({
        next: () =>{
          this.cargarCarrito();
        },
        error: (error) =>{
          console.error(error);
        }
      })

    }
  }

  // PAGAR CARRITO
  payCart():void{
    const userId = UserStorageService.getUserId();
    if(userId){
      this.carritoService.payCart(userId).subscribe({
        next: () =>{
          alert("Pago procesado exitosamente");
          this.generarFactura();
          this.cargarCarrito();
        },
        error: (error) =>{
          console.error(error);
        }
      })

    }
  }

  // GENERAR FACTURA
  generarFactura(): void {
    const doc = new jsPDF();
  
    // Encabezado de la factura
    doc.setFontSize(16);
    doc.text("Factura de Compra", 105, 20, { align: "center" });
  
    // Información del cliente
    const userId = UserStorageService.getUserId();
    doc.setFontSize(12);
  
    // Preparar datos para la tabla
    const tableBody = this.carrito.map((item: any) => {
      const nombre = item.product.name;
      const cantidad = item.quantity;
      const precioUnitario = item.product.price;
      const subtotal = cantidad * precioUnitario;
  
      return [
        nombre,
        cantidad,
        precioUnitario.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
        subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
      ];
    });
  
    // Agregar la tabla al PDF
    autoTable(doc, {
      startY: 60,
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']],
      body: tableBody,
      theme: 'striped',
      styles: { halign: 'center' },
      headStyles: { fillColor: [22, 160, 133] },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' },
      },
    });
  
    // Asegurarse de que `finalY` esté disponible
    const finalY = (doc as any).lastAutoTable?.finalY;
  
    // Totales
    const total = this.precioTotalCarrito();
    const iva = this.totalIVA();
  
    doc.setFontSize(12);
    doc.text("IVA:", 130, finalY + 10);
    doc.text(iva.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), 180, finalY + 10, { align: 'right' });
  
    doc.text("Total:", 130, finalY + 20);
    doc.text(total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), 180, finalY + 20, { align: 'right' });
  
    // Guardar el archivo
    doc.save(`Factura_${userId}.pdf`);
  }
  
  
}
