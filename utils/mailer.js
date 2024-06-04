const nodemailer = require("nodemailer");

module.exports = (email, text, type) => {
  const service = "hotmail";
  const user = "ariel.antunezcantero@hotmail.com";
  const pass = "antunez71j";
  let subject = "";
  let content = ``;

  if (type === "notification") {
    subject = "Purchase notification";
    let total = 0;

    content = `
      <table>
        <tr>
          <th>Purchase ID</th>   
          <th>Description</th>
          <th>Amount</th>
          <th>Price</th>
          <th>SubTotal</th>
        </tr>
    `;

    for (let i of text) {
      content =
        content +
        `
            <tr>
              <td>${i.id_venta}</td>
              <td>${i.descripcion}</td>
              <td>${i.cantidad}</td>
              <td>$${i.precio}</td>
              <td>$${i.subtotal}</td>
            </tr>
          `;

      total +=
        i.subtotal +
        parseFloat(i.entrega_domicilio ? i.precio_transporte : 0.0);
    }

    content = content + `</table>`;

    content =
      content +
      `<hr/><div>
      <strong>Total: $${total}</strong>
    </div>`;
  }

  if (type === "password") {
    subject = "Recover your password";

    content =
      `Please, to recover or change your password, click on the fallowing link: ${text}`;
  }

  let transporter = nodemailer.createTransport({
    service,
    auth: {
      user,
      pass,
    },
  });

  let mailOptions = {
    from: user,
    to: email,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error: ", err);
      return err;
    } else {
      console.log("Info: ", info.response);
      return info.response;
    }
  });
};
