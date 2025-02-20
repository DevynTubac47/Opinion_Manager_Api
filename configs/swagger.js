import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinion Manager API",
            version: "1.0.0",
            description: "API para un sistema de gestión de adopciones de mascotas",
            contact:{
                name: "Devyn Tubac",
                email: "dtubac-2020247@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/opinionManager/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.controller.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}