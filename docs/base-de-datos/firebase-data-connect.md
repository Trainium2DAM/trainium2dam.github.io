---
title: Firebase Data Connect
sidebar_position: 2
---

# Firebase Data Connect

Firebase Data Connect es un servicio de Firebase que expone una API GraphQL sobre una base de datos PostgreSQL gestionada. En Trainium se utiliza como backend complementario a Supabase para determinadas operaciones.

## Configuracion

El directorio `app/dataconnect/` contiene los artefactos de configuración de Data Connect:

```
dataconnect/
├── dataconnect.yaml           # Configuración del servicio
├── schema/
│   └── schema.gql             # Definición del esquema de tipos
└── default_connector/
    ├── connector.yaml         # Configuración del conector
    └── queries.gql            # Queries y mutaciones definidas
```

### dataconnect.yaml

Define el nombre del proyecto Firebase, la región y el nombre del servicio de Data Connect. La región configurada es `europe-southwest1`.

### connector.yaml

Define el nombre del conector por defecto (`default`) y asocia las queries del fichero `queries.gql` a dicho conector.

## Esquema GraphQL (schema.gql)

El esquema define seis tipos principales que se corresponden aproximadamente con las tablas de Supabase:

### Tipo Maquinas

```graphql
type Maquinas @table(name: "MAQUINAS") {
  id: Int!
  nombre: String! @col(dataType: "varchar(100)")
  tipo: String @col(dataType: "varchar(50)")
  estado: Int! @default(value: 0)
  descripcion: String @col(dataType: "text")
  operativa: Int! @default(value: 1)
}
```

### Tipo Usuario

```graphql
type Usuario @table(name: "USUARIO") {
  id: Int!
  nombre: String! @col(dataType: "varchar(100)")
  dni: String @unique @col(dataType: "varchar(20)")
  email: String @unique @col(dataType: "varchar(100)")
  contraseniaHash: String @col(name: "CONTRASEÑA_HASH", dataType: "varchar(255)")
  telefono: String @col(dataType: "varchar(20)")
  premium: Boolean @default(value: false)
  fechaIniPrem: Date @col(name: "FECHA_INI_PREM")
  fechaFinPrem: Date @col(name: "FECHA_FIN_PREM")
  fechaReg: Date! @col(name: "FECHA_REG") @default(expr: "request.time")
  admin: Int! @default(value: 0)
}
```

### Tipo Platos

```graphql
type Platos @table(name: "PLATOS") {
  id: Int!
  idUsuario: Usuario
  nombre: String! @col(dataType: "varchar(100)")
  descripcion: String @col(dataType: "text")
  calorias: Float @col(name: "CALORIAS")
  imagenUrl: String @col(name: "IMAGEN_URL", dataType: "varchar(255)")
  fechaSubida: Date! @col(name: "FECHA_SUBIDA") @default(expr: "request.time")
  visibilidad: Boolean @default(value: true)
}
```

### Tipo Reservas

```graphql
type Reservas @table(name: "RESERVAS") {
  id: Int!
  idUsuario: Usuario!
  idMaquina: Maquinas!
  fecha: Date
  horaInicio: String @col(name: "HORA_INICIO", dataType: "time")
  horaFin: String @col(name: "HORA_FIN", dataType: "time")
  estado: Boolean @default(value: true)
}
```

### Tipo PesoUsuario

```graphql
type PesoUsuario @table(name: "PESO_USUARIO") {
  id: Int!
  idUsuario: Usuario!
  peso: Float! @col(name: "PESO")
  fecha: Date
}
```

### Tipo Pagos

```graphql
type Pagos @table(name: "PAGOS") {
  id: Int!
  idUsuario: Usuario!
  monto: Int! @col(name: "monto", dataType: "bigint")
  fechaPago: Date @col(name: "fecha_pago")
  tipo: String @col(name: "tipo", dataType: "varchar(50)")
  metodoPago: String @col(name: "metodo_pago", dataType: "varchar(25)")
}
```

## Cliente HTTP (DataConnectClient.kt)

La comunicación con Data Connect no utiliza el SDK de Firebase para Android, sino un cliente HTTP manual implementado en `DataConnectClient.kt`. Este objeto singleton realiza peticiones `POST` al endpoint REST de Data Connect con el cuerpo de la query en formato JSON.

```kotlin
object DataConnectClient {
    private const val API_KEY = "..."
    private const val APP_ID = "1:689673187580:android:..."
    private const val ENDPOINT = "https://europe-southwest1-dataconnect.googleapis.com/v1beta/projects/bbdd-practicas/locations/europe-southwest1/services/bbdd-practicas-service/connectors/default:executeGraphql"

    suspend fun execute(
        query: String,
        variables: Map<String, Any?> = emptyMap(),
        operationName: String? = null
    ): JSONObject?
}
```

La autenticación con la API de Google se realiza mediante la cabecera `x-goog-api-key`. El endpoint incluye el subdominio regional `europe-southwest1-dataconnect.googleapis.com`, necesario para evitar respuestas 404 cuando el servicio está desplegado en una región específica.

El método `execute` devuelve el objeto `JSONObject` de la respuesta completa o `null` en caso de error de red o respuesta HTTP no exitosa. La llamada se ejecuta en el dispatcher `Dispatchers.IO` mediante `withContext`.
