const URL = "http://192.168.1.5:8080";
const NUMERO_DE_CUADROS = 12;
let imgOriginales;
let imgNuevas;

context("memo-test", ()=>{
  before(()=>{
    cy.visit(URL);
  })

  it("Asegurarse de que todas las imágenes esten cargadas", ()=>{
    cy.get("#tablero").find(".cuadroJuego").should("have.length", NUMERO_DE_CUADROS)
  });

  it("Asegurar que las imágenes sean aleatorias", () => {
    let imgOriginales = [];

    // Busca las imágenes dentro de los divs con la clase "cuadroJuego"
    cy.get(".cuadroJuego img").then((imagenes) => {
      imagenes.each((i, img) => {
        imgOriginales.push(img.getAttribute("src"));
      });
    });

    cy.visit(URL);

    let imgNuevas = [];

    // Vuelve a buscar las imágenes después de recargar la página
    cy.get(".cuadroJuego img").then((imagenes) => {
      imagenes.each((i, img) => {
        imgNuevas.push(img.getAttribute("src"));
      });

      cy.wrap(imgOriginales).should("not.deep.equal", imgNuevas);
    });
  });

})