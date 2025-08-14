const prisma = require('../config/prismaClient');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const { email, password, name, learningStyle } = req.body;
  try {
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, learningStyle }
    });
    const token = generateToken({ userId: user.id });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken({ userId: user.id });
  res.json({ token, user });
};
