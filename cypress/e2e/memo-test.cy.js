const URL = "http://192.168.100.82:8080";
const NUMERO_DE_CUADROS = 12;

context("memo-test", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("Asegurarse de que todas las imágenes estén cargadas", () => {
    cy.get("#tablero").find(".cuadroJuego img").should("have.length", NUMERO_DE_CUADROS);
  });

  it("Asegurar que las imágenes sean aleatorias", () => {
    cy.get("#tablero").find(".cuadroJuego img").then((imagenes) => {
      const imgOriginales = [];
      imagenes.each((i, img) => {
        imgOriginales.push(img.getAttribute("src"));
      });

      cy.visit(URL);

      cy.get("#tablero").find(".cuadroJuego img").then((imagenes) => {
        const imgNuevas = [];
        imagenes.each((i, img) => {
          imgNuevas.push(img.getAttribute("src"));
        });

        cy.wrap(imgOriginales).should("not.deep.equal", imgNuevas);
      });
    });
  });

  describe("Resolver el juego", () => {
    let listaDePares, mapaDePares
    it("Elige una combinación erronea", () => {
      cy.get(".cuadroJuego").then((cuadros) => {
        mapaDePares = obtenerParDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
        console.log("mapa de pares= ", mapaDePares)

        cy.get(listaDePares[0][0]).click().wait(1000);
        cy.get(listaDePares[1][0]).click();

        cy.get(".cuadroJuego").should("have.length", NUMERO_DE_CUADROS);
      });
    });
    it("Resolver el juego", () => {
      cy.get(".cuadroJuego img").should("have.length", NUMERO_DE_CUADROS);
      console.log("lista de pares= ", listaDePares);
      
      listaDePares.forEach((par) => {
        cy.get(par[0]).click().then(() => {
          cy.get(par[1]).click();
        });
      });
      cy.get(".cuadroJuego img").should("have.length", 0)
    });
  });
});

function obtenerParDeCuadros(cuadros){
  let pares = {};

  cuadros.each((i, cuadro) => {
    const clases = cuadro.classList.value; // Obtener todas las clases como una cadena
    const src = clases.replace("cuadroJuego h-100 border border-dark d-flex align-items-center", "").trim();
    
    if (pares[src]) {
      pares[src].push(cuadro); // Guardar el elemento DOM en lugar de la cadena de clase
    } else {
      pares[src] = [cuadro];
    }
  });
  console.log("pares", pares)
  return pares;
}