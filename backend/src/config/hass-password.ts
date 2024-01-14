import bcryptjs from "bcryptjs"

export class HashPassword {

    static async hash(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcryptjs.hash(password, 10, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
    }

    static async compare(password: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcryptjs.compare(password, hash, (err, same) => {
                if (err) reject(err)
                resolve(same)
            })
        })
    }
}