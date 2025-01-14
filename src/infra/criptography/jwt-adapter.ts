import jwt from "jsonwebtoken"

class JwtAdapter {
  constructor(private readonly secret: string) {}

  async encrypt(data: any, options: any = {}): Promise<string> {
    const ciphertext = await jwt.sign(data, this.secret, options)
    return ciphertext
  }

  async decrypt(ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, this.secret)
    return plaintext
  }
}


export default new JwtAdapter(process.env.JWT_SECRET || "123456")