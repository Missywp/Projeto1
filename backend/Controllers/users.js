import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM personagens";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addUser = (req, res) => {
  const q =
    "INSERT INTO personagens(`personagem`, `serie`, `ano`, `genero`) VALUES(?)";

  const values = [
    req.body.personagem,
    req.body.serie,
    req.body.ano,
    req.body.genero,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Personagem criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE personagens SET `personagem` = ?, `serie` = ?, `ano` = ?, `genero` = ? WHERE `id` = ?";

  const values = [
    req.body.personagem,
    req.body.serie,
    req.body.ano,
    req.body.genero,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Personagem atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM personagens WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Personagem excluído com sucesso.");
  });
};
