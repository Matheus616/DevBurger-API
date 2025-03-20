import * as yup from 'yup';
import User from '../models/User'

class SessionController {
    async store(request, response) {
        const schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorrect = () =>
            response
                .status(401)
                .json({ error: 'Make sure your email or passwor are correct' })


        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSamePassword = await user.comparePassword(password);

        if (!isSamePassword) {
            return emailOrPasswordIncorrect();
        }

        return response.status(201).json({
            id: user.id,
            name: user.nome,
            email,
            admin: user.admin

        })
    }
}

export default new SessionController();