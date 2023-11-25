const URL = "http://192.168.1.5:8080";
const NUMERO_DE_CUADROS = 12;

context("memo-test", ()=>{
  beforeEach(()=>{
    cy.visit(URL);
  })

  it("Asegurarse de que todas las imágenes esten cargadas", ()=>{
    cy.get("#tablero").find(".cuadroJuego img").should("have.length", NUMERO_DE_CUADROS)
  });

  it("Asegurar que las imágenes sean aleatorias", () => {
    let imgOriginales = [];

    
    cy.get("#tablero").find(".cuadroJuego img").then((imagenes) => {
      imagenes.each((i, img) => {
        imgOriginales.push(img.getAttribute("src"));
      });
    });

    cy.visit(URL);

    let imgNuevas = [];

    
    cy.get("#tablero").find(".cuadroJuego img").then((imagenes) => {
      imagenes.each((i, img) => {
        imgNuevas.push(img.getAttribute("src"));
      });

      cy.wrap(imgOriginales).should("not.deep.equal", imgNuevas);
    });
  });

})