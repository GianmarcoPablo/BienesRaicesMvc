import jwt from "jsonwebtoken"

export class JwtAdapter {
    constructor(private readonly secret: string) { }

    async sign(payload: any): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: "1h" }, (err, token) => {
                if (err) reject(err)
                resolve(token as string)
            })
        })
    }

    async verify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }
}   