
        <div className="auth__birth u-margin-top-small">
          <div className="auth__birth--wrapper">
            <Select type={"day"} />
            {/* Ici, vous pouvez mettre une icône de flèche pour le dropdown */}
          </div>
          <div className="auth__birth--wrapper">
            <Select type={"month"} />
          </div>
          <div className="auth__birth--wrapper">
            <Select type={"year"} />
          </div>
        </div>
        {errorType === "dateError" && (
          <Message message={message} type="error" />
        )}
        <p className="auth__message--privacy sub--label">
          La confidentialité de ta date de naissance sera préservée et ne sera
          pas rendue publique.
        </p>