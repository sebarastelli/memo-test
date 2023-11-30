const URL = "http://192.168.1.10:8080";
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

  describe("Resolver el juego", ()=>{
    let mapaDePares, listaDePares;
    it("Elige una combinación erronea", ()=>{
      cy.get(".cuadroJuego img").then(cuadros=>{
        mapaDePares = obtenerParDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
        console.log(listaDePares)
        cy.get(`[src="${listaDePares[0][0]}"]`).click();

        // Hacer clic en la primera imagen del segundo par
        cy.get(`[src="${listaDePares[1][0]}"]`).click({ multiple: true });
  

        cy.get(".cuadroJuego img").should("have.length", NUMERO_DE_CUADROS)
      })
    })
    
  })
})

function obtenerParDeCuadros(cuadros){
  let pares = {};

  cuadros.each((i, cuadro) => {
    const src = cuadro.getAttribute("src");

    if (pares[src]) {
      pares[src].push(src);
    } else {
      pares[src] = [src];
    }
  });
  console.log(pares)
  return pares;
}