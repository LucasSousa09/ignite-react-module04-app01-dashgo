import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import {faker} from '@faker-js/faker'

type User = {
    name: string,
    email: string,
    created_at: string
}

export function makeServer(){
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer
        },
        models: {
            //Partial = Serve para momentos que precisamos usar o User sem informar todos os campos
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                createdAt(){
                    return faker.date.recent(10)
                },
            })
        },

        seeds(server){
            server.createList('user', 200)
        },
    
        routes() {
            this.namespace = 'api'
            this.timing = 750

            this.get('/users', function(schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user'))
                    .users
                    .slice(pageStart, pageEnd)

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            })

            this.get('/users/:id')
            this.post('/users')

            this.namespace = ''

            //passthrough = serve para que todas as rotas acessadas com namespace indicado passem pelo mirage e caso elas não sejam encontradas passem direto para uma possível outra parte da aplicação
            this.passthrough()
        }
    })

    return server;
}