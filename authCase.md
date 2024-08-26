    await newUser.save({ validateBeforeSave: false });

    const message = `<html lang="en">
    <head>
    </head>
    <body>
        <div class="container">
          <h5>Cher utilisateur</h5>
          <pre></pre>
          <p>Merci de vous être inscrit à notre plateforme. Pour activer votre compte, veuillez saisir le code de confirmation à 6 chiffres suivant : <span style="font-weight:bold; font-size:30px">${otp}</span}<span></p>
            <p>Veuillez entrer ce code dans l'application ou le site Web pour finaliser le processus d'activation de votre compte. Veuillez noter que ce code de confirmation est valable pendant 5 minutes. Après cette période, le code expirera et vous devrez en demander un nouveau.</p>
            <p>Si vous n'avez pas demandé cette activation, veuillez ignorer cet e-mail.</p>
            
            <a>Cordialement,
    L'équipe Inspire"</a>
        </div>
    </body>
    </html>`;
    try {
      await sendEmail({
        email: email,
        subject: "Activation du compte",
        message,
      });
      res.status(200).json({
        status: "success",
        message:
          "Un code de confirmation à 6 chiffres vous a été envoyé par e-mail. Veuillez vérifier votre boîte de réception et saisir le code pour activer votre compte.",
        user: newUser,
      });
    } catch (error) {
      return next(new AppError("Erreur lors de l'envoie du mail"), 500);
    }
  } else if (user) {
    if (user.active) {
      return next(
        new AppError(
          "Ce compte existe déjà, veuillez vous connecter",
          400,
          "emailError"
        )
      );
    } else {
      res.status(200).json({
        status: "success",
        user,
      });
      // if (user.otpExpiry < Date.now()) {
      //   return next(
      //     new AppError("Le code a expiré, veuillez saisir un nouveau code", 400)
      //   );
      // }

      // else

      // return next(new AppError("MON GARSSS", 400));
    }
  }