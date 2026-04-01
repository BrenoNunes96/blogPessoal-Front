function Home() {
  return (
    <>
      <div style={{ background: '#312e81', display: "flex", justifyContent: "center" }}>
        
        {/* Início do Grid que divide a tela em 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', color: 'white', width: "100%", maxWidth: '1280px' }}>
          
          {/* LADO ESQUERDO (Textos e Botão) */}
          <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Seja bem vinde!</h2>
            <p style={{ fontSize: '1.25rem' }}>Expresse aqui seus pensamentos e opiniões</p>
            
            {/* Botão (agora está DENTRO do lado esquerdo, junto com os textos) */}
            <div style={{ display: "flex", justifyContent: "space-around", gap: "1rem" }}>
              <div style={{ borderRadius: "0.5rem", color: "white", border: "2px solid white", padding: "0.5rem 1rem" }}>
                Nova Postagem
              </div>
            </div>
          </div>
          {/* Fim do LADO ESQUERDO */}

          {/* LADO DIREITO (Imagem) */}
          {/* Agora a imagem está DENTRO do Grid, ocupando a segunda coluna */}
          <div style={{ display: "flex", justifyContent: 'center' }}>
            <img style={{ width: "66%" }} src="https://ik.imagekit.io/fsnhaprtb/default-image.jpg?updatedAt=1774969926429" alt="imagem da pagina home" />
          </div>
          {/* Fim do LADO DIREITO */}

        </div>
        {/* Fim do Grid */}

      </div>
    </>
  );
}

export default Home;