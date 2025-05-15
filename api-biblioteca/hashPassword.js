import bcrypt from "bcryptjs";

async function generateHashedPassword(){
    const password = 'teste'; // substituir pela senha desejada
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassowrd = await bcrypt.hash(password, salt)

        console.log('Senha hasheada: ', hashedPassowrd);
        process.exit(0);

    } catch(err) {
        console.error('Erro ao harshear a senha: ', err);
        process.exit(1)
    }
}

generateHashedPassword();