import React, { useState, useEffect, useMemo } from 'react';

// Dados processados diretamente do CSV fornecido pelo usuário.
// Todos os caracteres especiais foram corrigidos para a exibição correta.
// Adicionei uma propriedade 'photoUrl' simulada para demonstração.
const initialData = [
  { city: "Abreu e Lima", mayor: "Flávio Gadelha", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/flavio_gadelha_abreu_e_lima.jpg" },
  { city: "Afogados da Ingazeira", mayor: "Sandrinho Palmeira", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/sandrinho_palmeira_afogados_da_ingazeira.jpg" },
  { city: "Afrânio", mayor: "Cloves Ramos", oldParty: "MDB", newParty: "MDB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/cloves_ramos_afranio.jpeg" },
  { city: "Agrestina", mayor: "Josué Mendes", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/josue_mendes_agrestina.jpeg" },
  { city: "Água Preta", mayor: "Miruca", oldParty: "PSB", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/miruca_agua_preta.jpeg" },
  { city: "Águas Belas", mayor: "Dr. Elton Martins", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/elton_martins_aguas_belas.jpeg" },
  { city: "Alagoinha", mayor: "Simãozinho", oldParty: "PSDB", newParty: "PSD", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/simaozinho_alagoinha.jpg" },
  { city: "Aliança", mayor: "Pedro Freitas", oldParty: "PP", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/pedro_freitas_alianca.jpeg" },
  { city: "Altinho", mayor: "Marivaldo Pena", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/marivaldo_pena_altinho.jpeg" },
  { city: "Amaraji", mayor: "Araujo", oldParty: "Avante", newParty: "Avante", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/araujo_amaragi.jpeg" },
  { city: "Angelim", mayor: "Caique o Galeguinho", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/caique_o_galeginho_angelim.jpg" },
  { city: "Araçoiaba", mayor: "Jogli Uchôa", oldParty: "PSD", newParty: "PSD", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/jogli_uchoa_aracoiaba.jpg" },
  { city: "Araripina", mayor: "Evilásio Mateus", oldParty: "PDT", newParty: "PDT", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/evilasio_mateus_araripina.jpg" },
  { city: "Arcoverde", mayor: "Zeca Cavalcanti", oldParty: "PODE", newParty: "PODE", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/zeca_cavalcanti_arcoverde1.jpg" },
  { city: "Barra da Guabiraba", mayor: "Diogo", oldParty: "PSDB", newParty: "PSD", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/diogo_barra_da_guabiraba.jpg" },
  { city: "Barreiros", mayor: "Carlinhos da Pedreira", oldParty: "PP", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/carlinhos_da_pedreira_barreiros.jpg" },
  { city: "Belém de Maria", mayor: "Beto do Sargento", oldParty: "PSDB", newParty: "PSD", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/beto_do_sargento_belem_de_maria.jpg" },
  { city: "Belém do São Francisco", mayor: "Calby Cavalcanti", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/calby_cavalcanti_belem_do_sao_francisco.jpg" },
  { city: "Belo Jardim", mayor: "Gilvandro Estrela", oldParty: "União", newParty: "União", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/gilvando_estrela_belo_jardim.jpg" },
  { city: "Betânia", mayor: "Bebe Água", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/bebe_agua_betania.jpeg" },
  { city: "Bezerros", mayor: "Lucielle Laurentino", oldParty: "União", newParty: "União", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/lucielle_laurentino_bezerros.jpg" },
  { city: "Bodocó", mayor: "Dr Otávio", oldParty: "MDB", newParty: "MDB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/dr_otavio_bodoco.jpeg" },
  { city: "Bom Jardim", mayor: "Janjão", oldParty: "União", newParty: "PSD", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/dr_edezio_bom_conselho.png" },
  { city: "Bonito", mayor: "Dr Ruy", oldParty: "PSB", newParty: "PSB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/dr_ruy_bonito.jpg" },
  { city: "Brejão", mayor: "Saulo Maruim", oldParty: "PP", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/saulo_maruim_brejao.jpg" },
  { city: "Brejinho", mayor: "Gilson Bento", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/gilson_bento_brejinho.jpg" },
  { city: "Brejo da Madre de Deus", mayor: "Roberto Asfora", oldParty: "PP", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/roberto_asfora_brejo_da_madre_de_deus.jpeg" },
  { city: "Buenos Aires", mayor: "Henrique Queiroz", oldParty: "PP", newParty: "PP", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/henrique_queiroz_buenos_aires.jpg" },
  { city: "Buíque", mayor: "Túlio Monteiro", oldParty: "MDB", newParty: "MDB", photoUrl: "https://jamildo.com/media/uploads/2025/prefeitos/tulio_monteiro_buique.jpg" },
  { city: "Cabo de Santo Agostinho", mayor: "Lula Cabral", oldParty: "Solidariedade", newParty: "Solidariedade", photoUrl: "" },
  { city: "Cabrobró", mayor: "Galego do Nanai", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Cachoeirinha", mayor: "André Raimundo", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Caetés", mayor: "Tirri", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Calçado", mayor: "Zé Elias Filho", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Calumbi", mayor: "Joelson", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Camaragibe", mayor: "Diego Cabral", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Camocim de São Felix", mayor: "Sostenes", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Camutanga", mayor: "Talita de Doda", oldParty: "PV", newParty: "PV", photoUrl: "" },
  { city: "Canhotinho", mayor: "Sandra Paes", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Capoeiras", mayor: "Nego do Mercado", oldParty: "PSB", newParty: "PSD", photoUrl: "" },
  { city: "Carnaíba", mayor: "Berg Gomes", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Carnaubeira da Penha", mayor: "Elizinho", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Carpina", mayor: "Eduarda Gouveia", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Caruaru", mayor: "Rodrigo Pinheiro", oldParty: "PSD", newParty: "sem partido", photoUrl: "" },
  { city: "Casinhas", mayor: "Juliana de Chaparral", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "Catende", mayor: "Dona Graça", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Cedro", mayor: "Riva Bezerra", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Chã de Alegria", mayor: "Marcos da Roça", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Chã Grande", mayor: "Sandro Advogado", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Condado", mayor: "Albino", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Correntes", mayor: "Edimilson da Bahia", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Cortês", mayor: "Fátima Borba", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Cumaru", mayor: "Zeneide Medeiros", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Cupira", mayor: "Eduardo Lira", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "Custódia", mayor: "Manoel Messias", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Dormentes", mayor: "Corrinha de Geomarco", oldParty: "PSB", newParty: "PSD", photoUrl: "" },
  { city: "Escada", mayor: "Mary Gouveia", oldParty: "PL", newParty: "PL", photoUrl: "" },
  { city: "Exu", mayor: "Junior Pinto", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Feira Nova", mayor: "Joel Gonzaga", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Ferreiros", mayor: "Zé Roberto", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Flores", mayor: "Gilberto Ribeiro", oldParty: "PSB", newParty: "PSD", photoUrl: "" },
  { city: "Floresta", mayor: "Forró Maniçoba", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Frei Miguelinho", mayor: "Lindonaldo da Farinha", oldParty: "PSB", newParty: "PSD", photoUrl: "" },
  { city: "Gameleira", mayor: "Dr Leandro", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Garanhuns", mayor: "Sivaldo Albino", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Glória do Goitá", mayor: "Jaminho", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Granito", mayor: "George de Sidney", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Gravatá", mayor: "Padre Joselito", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Goiana", mayor: "Marcílio Régio", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Iati", mayor: "Camila Souza", oldParty: "PSB", newParty: "PSD", photoUrl: "" },
  { city: "Ibimirim", mayor: "Welliton Siqueira", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Ibirajuba", mayor: "Izalta", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Igarassu", mayor: "Professora Elcione", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Iguaracy", mayor: "Dr Pedro Alves", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Ilha de Itamaracá", mayor: "Paulo Galvão", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Inajá", mayor: "Marcelo de Alberto", oldParty: "Republicanos", newParty: "PSD", photoUrl: "" },
  { city: "Ingazeira", mayor: "Luciano Torre", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Ipojuca", mayor: "Carlos Santana", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Ipubi", mayor: "João Marcos Siqueira", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Itacuruba", mayor: "Juninho Cantarelli", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Itaíba", mayor: "Pedro Pilota", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Itambé", mayor: "Armando Pimentel", oldParty: "PV", newParty: "PV", photoUrl: "" },
  { city: "Itapetim", mayor: "Aline", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Itapissuma", mayor: "Júnior de Irmã Teca", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Itaquitinga", mayor: "Patrick Moraes", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Jaboatão dos Guararapes", mayor: "Mano Medeiros", oldParty: "PL", newParty: "PL", photoUrl: "" },
  { city: "Jaqueira", mayor: "Ridete Pellegrino", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Jataúba", mayor: "Dra Cátia", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Jatobá", mayor: "Rogério Ferreira", oldParty: "Republicanos", newParty: "PSD", photoUrl: "" },
  { city: "João Alfredo", mayor: "Zé Martins", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Joaquim Nabuco", mayor: "Márcia Barreto", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Jucati", mayor: "Clelson Peixoto", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Jupi", mayor: "Rivanda", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Jurema", mayor: "Branco de Geraldo", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Lagoa do Itaenga", mayor: "Dimas Natanael", oldParty: "Republicanos", newParty: "PSD", photoUrl: "" },
  { city: "Lagoa do Carro", mayor: "Zé Luiz", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Lagoa do Ouro", mayor: "Edson Quebra", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Lagoa dos Gatos", mayor: "Stênio", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Lagoa Grande", mayor: "Catharina Garziera", oldParty: "PSB", newParty: "MDB", photoUrl: "" },
  { city: "Lajedo", mayor: "Erivaldo Chagas", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Limoeiro", mayor: "Orlando Jorge", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Macaparana", mayor: "Paquinha", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Machados", mayor: "Juarez da Banana", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Manari", mayor: "Junior do Audalio", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Maraial", mayor: "Marlos Henrique", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Mirandiba", mayor: "Dr Evaldo", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Moreilândia", mayor: "Teto Texeira", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Moreno", mayor: "Edmilson Cupertino", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Nazaré da Mata", mayor: "Aninha da Ferbom", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Olinda", mayor: "Mirella Almeida", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Orobó", mayor: "Biu Abreu", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Orocó", mayor: "Ismael Lira", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Ouricuri", mayor: "Victor Coelho", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Palmares", mayor: "Junior de Beto", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Palmeirina", mayor: "Delegada Thatianne", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Panelas", mayor: "Ruben", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Paranatama", mayor: "Dr Henrique Gois", oldParty: "MDB", newParty: "PSD", photoUrl: "" },
  { city: "Paranamirim", mayor: "Múcio Angelim", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Passira", mayor: "Silvestre", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Paudalho", mayor: "Paulinha da Educação", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Paulista", mayor: "Severino Ramos", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Pedra", mayor: "Júnior Vaz", oldParty: "PV", newParty: "PV", photoUrl: "" },
  { city: "Pesqueira", mayor: "Cacique Marcos", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Petrolândia", mayor: "Fabiano Marcos", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Petrolina", mayor: "Simão Durano", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "Poção", mayor: "Guilherme Vasconcelos", oldParty: "MDB", newParty: "PSD", photoUrl: "" },
  { city: "Pombos", mayor: "Elias Meu Fii", oldParty: "MDB", newParty: "PSD", photoUrl: "" },
  { city: "Primavera", mayor: "Jeyson Falcão", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Quipapá", mayor: "Pité", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Quixaba", mayor: "Zé Pretinho", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Recife", mayor: "João Campos", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Riacho das Almas", mayor: "Dió Filho", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Ribeirão", mayor: "Carol Jordão", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Rio Formoso", mayor: "Berg de Hacker", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Sairé", mayor: "Gildo Dias", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Salgadinho", mayor: "Joia", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Salgueiro", mayor: "Fabinho", oldParty: "PRD", newParty: "PSD", photoUrl: "" },
  { city: "Saloá", mayor: "Junior De Rivaldo", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Sanharó", mayor: "César Freitas", oldParty: "PC do B", newParty: "PC do B", photoUrl: "" },
  { city: "Santa Cruz", mayor: "Cachoeira", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Santa Cruz da Baixa Verde", mayor: "Dr. Ismael", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Santa Cruz do Capibaribe", mayor: "Helinho Aragão", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Santa Filomena", mayor: "Gildevan", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Santa Maria da Boa Vista", mayor: "George Duarte", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Santa Maria do Cambucá", mayor: "Robevan", oldParty: "PV", newParty: "PV", photoUrl: "" },
  { city: "Santa Terezinha", mayor: "Delson Lustosa", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "São Benedito do Sul", mayor: "Zé Baiano", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "São Bento do Una", mayor: "Alexandre Batité", oldParty: "MDB", newParty: "MDB", photoUrl: "" },
  { city: "São Caitano", mayor: "Josafa", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "São João", mayor: "Wilson Lima", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "São Joaquim do Monte", mayor: "Duguinha", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "São José da Coroa Grande", mayor: "Barbosa", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "São José do Belmonte", mayor: "Vinicius Marques", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "São José do Egito", mayor: "Fredson Brito", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "São Lourenço da Mata", mayor: "Vinicius Labanca", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "São Vicente Férrer", mayor: "Marcone", oldParty:"PP", newParty: "PP", photoUrl: "" },
  { city: "Serra Talhada", mayor: "Márcia Conrado", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Serrita", mayor: "Aleudo Benedito", oldParty: "MDB", newParty: "MDB", photoUrl: "" },
  { city: "Sertânia", mayor: "Pollyanna Abreu", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Sirinhaém", mayor: "Manoel da Retifica", oldParty: "PODE", newParty: "PODE", photoUrl: "" },
  { city: "Solidão", mayor: "Mayco da Farmácia", oldParty: "PSB", newParty: "PSB", photoUrl: "" },
  { city: "Surubim", mayor: "Chaparral", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "Tabira", mayor: "Flávio Marques", oldParty: "PT", newParty: "PT", photoUrl: "" },
  { city: "Tacaimbó", mayor: "Joelda Pereira", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Tacaratu", mayor: "Whashington", oldParty: "MDB", newParty: "PSD", photoUrl: "" },
  { city: "Tamandaré", mayor: "Carrapicho", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Taquaritinga do Norte", mayor: "Gena Lins", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Terezinha", mayor: "Arnobio Gomes", oldParty: "Republicanos", newParty: "Republicanos", photoUrl: "" },
  { city: "Terra Nova", mayor: "Dinha Mororó", oldParty: "Avante", newParty: "Avante", photoUrl: "" },
  { city: "Timbaúba", mayor: "Ivanildinho", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Toritama", mayor: "Sergio Colin", oldParty: "MDB", newParty: "MDB", photoUrl: "" },
  { city: "Tracunhaém", mayor: "Irmão Aluizio", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Trindade", mayor: "Helbinha de Rodrigues", oldParty: "União", newParty: "União", photoUrl: "" },
  { city: "Triunfo", mayor: "Luciano Bonfim", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Tupanatinga", mayor: "Professor Ronaldo", oldParty: "PP", newParty: "PP", photoUrl: "" },
  { city: "Tuparetama", mayor: "Diógenes Patriota", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Venturosa", mayor: "Kelvin Cavalcanti", oldParty: "PSD", newParty: "PSD", photoUrl: "" },
  { city: "Verdejante", mayor: "Xicão Tavares", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Vertente do Lério", mayor: "Dr Histênio", oldParty: "MDB", newParty: "PSD", photoUrl: "" },
  { city: "Vertentes", mayor: "Rael", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Vicência", mayor: "Eder", oldParty: "PSDB", newParty: "PSD", photoUrl: "" },
  { city: "Vitória de Santo Antão", mayor: "Paulo Roberto", oldParty: "MDB", newParty: "MDB", photoUrl: "" },
  { city: "Xexéu", mayor: "Thiago de Miel", oldParty: "PSD", newParty: "PSD", photoUrl: "" }
];

// URLs das imagens dos prefeitos
// Adicione as URLs das imagens PNG dos prefeitos aqui.
// Se uma URL não for fornecida para um prefeito, um avatar com as iniciais será gerado.
const MAYOR_IMAGE_URLS = {
  "Flávio Gadelha": "https://jamildo.com/media/uploads/2025/prefeitos/flavio_gadelha_abreu_e_lima.jpg",
  "Sandrinho Palmeira": "https://jamildo.com/media/uploads/2025/prefeitos/sandrinho_palmeira_afogados_da_ingazeira.jpg",
  "Cloves Ramos": "https://jamildo.com/media/uploads/2025/prefeitos/cloves_ramos_afranio.jpeg",
  "Josué Mendes": "https://jamildo.com/media/uploads/2025/prefeitos/josue_mendes_agrestina.jpeg",
  "Miruca": "https://jamildo.com/media/uploads/2025/prefeitos/miruca_agua_preta.jpeg",
  "Dr. Elton Martins": "https://jamildo.com/media/uploads/2025/prefeitos/elton_martins_aguas_belas.jpeg",
  "Simãozinho": "https://jamildo.com/media/uploads/2025/prefeitos/simaozinho_alagoinha.jpg",
  "Pedro Freitas": "https://jamildo.com/media/uploads/2025/prefeitos/pedro_freitas_alianca.jpeg",
  "Marivaldo Pena": "https://jamildo.com/media/uploads/2025/prefeitos/marivaldo_pena_altinho.jpeg",
  "Araujo": "https://jamildo.com/media/uploads/2025/prefeitos/araujo_amaragi.jpeg",
  "Caique o Galeguinho": "https://jamildo.com/media/uploads/2025/prefeitos/caique_o_galeginho_angelim.jpg",
  "Jogli Uchôa": "https://jamildo.com/media/uploads/2025/prefeitos/jogli_uchoa_aracoiaba.jpg",
  "Evilásio Mateus": "https://jamildo.com/media/uploads/2025/prefeitos/evilasio_mateus_araripina.jpg",
  "Zeca Cavalcanti": "https://jamildo.com/media/uploads/2025/prefeitos/zeca_cavalcanti_arcoverde1.jpg",
  // Continue adicionando as URLs para todos os prefeitos aqui
  // Exemplo para o Eder de Vicência:
  // "Eder": "URL_DA_FOTO_DO_EDER.png",
};


// Cores definidas pelo usuário
const PRIMARY_COLOR = "#024796"; // Azul
const ACCENT_COLOR = "#f83d03"; // Laranja
const LIGHT_ACCENT_COLOR_BG = "#FFEFE5"; // Um laranja bem claro para o background de pop-ups/cards de transferência

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Agrega dados para o "Dança da cadeira dos Partidos"
  const overviewData = useMemo(() => {
    const prefeiturasAnalisadas = initialData.length;
    const transferencias = initialData.filter(d => d.oldParty !== d.newParty).length;
    const permanencias = initialData.filter(d => d.oldParty === d.newParty).length;
    const taxaDeMudanca = ((transferencias / prefeiturasAnalisadas) * 100 || 0).toFixed(1);

    return { prefeiturasAnalisadas, transferencias, permanencias, taxaDeMudanca };
  }, []);

  // Agrega dados para o "Placar de Transferências"
  const placarData = useMemo(() => {
    const partyStats = {};
    initialData.forEach(d => {
      // Garante que ambos os partidos (antigo e novo) existam nas estatísticas
      partyStats[d.oldParty] = partyStats[d.oldParty] || { contratacoes: 0, saidas: 0, saldo: 0 };
      partyStats[d.newParty] = partyStats[d.newParty] || { contratacoes: 0, saidas: 0, saldo: 0 };

      if (d.oldParty !== d.newParty) { // É uma transferência real
        partyStats[d.oldParty].saidas++;
        partyStats[d.oldParty].saldo--;
        partyStats[d.newParty].contratacoes++;
        partyStats[d.newParty].saldo++;
      }
    });

    return Object.entries(partyStats)
      .map(([party, stats]) => ({ party, ...stats }))
      .sort((a, b) => b.saldo - a.saldo); // Ordena por saldo
  }, []);

  // Agrega dados para a "Classificação do Campeonato"
  const classificacaoData = useMemo(() => {
    const prefeiturasPorPartido = {};
    initialData.forEach(d => {
      prefeiturasPorPartido[d.newParty] = (prefeiturasPorPartido[d.newParty] || 0) + 1;
    });

    return Object.entries(prefeiturasPorPartido)
      .map(([party, count]) => ({
        party,
        prefeituras: count,
        saldoFinal: placarData.find(p => p.party === party)?.saldo || 0 // Reusa o saldo calculado no placar
      }))
      .sort((a, b) => b.prefeituras - a.prefeituras); // Ordena por número de prefeituras
  }, [placarData]);

  // Filtra as "Últimas Transferências" com base no termo de busca
  const filteredTransfers = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return initialData.filter(entry => {
      // Adiciona uma verificação para garantir que a propriedade existe e é uma string antes de chamar toLowerCase()
      const mayorMatch = (entry.mayor || '').toLowerCase().includes(lowerCaseSearchTerm);
      const cityMatch = (entry.city || '').toLowerCase().includes(lowerCaseSearchTerm);
      const oldPartyMatch = (entry.oldParty || '').toLowerCase().includes(lowerCaseSearchTerm);
      const newPartyMatch = (entry.newParty || '').toLowerCase().includes(lowerCaseSearchTerm);

      return mayorMatch || cityMatch || oldPartyMatch || newPartyMatch;
    });
  }, [searchTerm]);

  // Função para gerar URL de placeholder de imagem ou usar a URL fornecida
  const getMayorPhotoSrc = (mayorName, photoUrl) => {
    // Tenta obter a URL da imagem da lista MAYOR_IMAGE_URLS primeiro
    const predefinedPhotoUrl = MAYOR_IMAGE_URLS[mayorName];
    if (predefinedPhotoUrl) {
      return predefinedPhotoUrl;
    }
    
    // Se a URL da foto for fornecida nos dados iniciais, usa-a
    if (photoUrl) {
      return photoUrl; 
    }

    // Caso contrário, gera um placeholder com as iniciais
    const nameParts = (mayorName || '').split(' ');
    let initials = '';
    if (nameParts.length > 0) {
      initials += nameParts[0].substring(0, 1);
      if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1].substring(0, 1);
      }
    }
    // Garante que as iniciais sejam maiúsculas
    initials = initials.toUpperCase(); 

    // Cor do texto das iniciais baseada na PRIMARY_COLOR, cor de fundo oposta
    const bgColor = PRIMARY_COLOR.replace('#', '');
    const textColor = ACCENT_COLOR.replace('#', ''); // Usa a cor de destaque para o texto

    return `https://placehold.co/60x60/${bgColor}/${textColor}?text=${initials}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans flex flex-col items-center">
      {/* Carrega o Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Carrega a fonte Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Cabeçalho */}
      <header className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-2xl mb-10 flex flex-col items-center text-center">
        {/*
          COMO ADICIONAR A SUA LOGO:
          Substitua 'URL_DA_SUA_LOGO.png' pela URL real da sua imagem PNG.
          Certifique-se de que a URL da imagem esteja publicamente acessível.
        */}
        <img
          src="https://jamildo.com/media/uploads/logojamildo.png" // Substitua esta URL pela URL da sua logo PNG
          alt="Logo do Site Jamildo.com"
          className="h-20 mb-6 object-contain" // Ajuste a altura (h-20) conforme necessário
        />
        <h1 className="text-5xl font-extrabold mb-3" style={{ color: PRIMARY_COLOR }}>
          <span className="text-6xl" style={{ color: ACCENT_COLOR }}>⚽</span> Dança das Cadeiras dos Partidos
        </h1>
        <p className="text-xl text-gray-600 mb-6">Análise das transferências partidárias dos prefeitos de Pernambuco</p>
      </header>

      {/* Visão Geral: Cards */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Card: Prefeituras Analisadas */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="p-3 rounded-full mb-3" style={{ background: PRIMARY_COLOR }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m8-16v12m0 0h2m-2 0h-2M13 17h1m-1 4h1m-1-4h-2m-2 4h-2"></path></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Prefeituras Analisadas</h3>
          <p className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>{overviewData.prefeiturasAnalisadas}</p>
        </div>

        {/* Card: Transferências */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-l-4" style={{ borderColor: ACCENT_COLOR }}>
          <div className="p-3 rounded-full mb-3" style={{ background: ACCENT_COLOR }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Transferências</h3>
          <p className="text-4xl font-extrabold" style={{ color: ACCENT_COLOR }}>{overviewData.transferencias}</p>
        </div>

        {/* Card: Permanências */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="p-3 rounded-full mb-3" style={{ background: PRIMARY_COLOR }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Permanências</h3>
          <p className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>{overviewData.permanencias}</p>
        </div>

        {/* Card: Taxa de Mudança */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-l-4" style={{ borderColor: ACCENT_COLOR }}>
          <div className="p-3 rounded-full mb-3" style={{ background: ACCENT_COLOR }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l0 10m0 0l4-4m-4 4l-4-4m6-6l0 10m0 0l4-4m-4 4l-4-4"></path></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Taxa de Mudança</h3>
          <p className="text-4xl font-extrabold" style={{ color: ACCENT_COLOR }}>{overviewData.taxaDeMudanca}%</p>
        </div>
      </section>

      {/* Tabelas: Placar de Transferências e Classificação do Campeonato */}
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Placar de Transferências */}
        <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-5 text-center" style={{ color: PRIMARY_COLOR }}>Placar de Transferências</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-800" style={{ backgroundColor: PRIMARY_COLOR }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">PARTIDO</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">CONTRATAÇÕES</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">SAÍDAS</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">SALDO</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {placarData.map((data, index) => (
                  <tr key={data.party} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.party}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{data.contratacoes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{data.saidas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold" style={{ color: data.saldo > 0 ? 'green' : (data.saldo < 0 ? ACCENT_COLOR : 'gray') }}>{data.saldo > 0 ? `+${data.saldo}` : data.saldo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classificação do Campeonato */}
        <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-5 text-center" style={{ color: PRIMARY_COLOR }}>Classificação do Campeonato</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-800" style={{ backgroundColor: PRIMARY_COLOR }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">PARTIDO</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">PREFEITURAS</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">SALDO FINAL</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classificacaoData.map((data, index) => (
                  <tr key={data.party} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.party}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.prefeituras}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold" style={{ color: data.saldoFinal > 0 ? 'green' : (data.saldoFinal < 0 ? ACCENT_COLOR : 'gray') }}>{data.saldoFinal > 0 ? `+${data.saldoFinal}` : data.saldoFinal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Últimas Transferências (Lista Individual) */}
      <section className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-2xl mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY_COLOR }}>Últimas Transferências</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por prefeito, cidade ou partido..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-lg"
            style={{ borderColor: PRIMARY_COLOR, '--tw-ring-color': PRIMARY_COLOR }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredTransfers.length === 0 ? (
          <p className="text-center text-gray-600 py-10 text-lg">Nenhuma transferência encontrada com o termo de busca.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransfers.map((transfer, index) => {
              // Determina a cor de fundo e da borda com base na mudança de partido
              const isTransfer = transfer.oldParty !== transfer.newParty;
              const cardBgColor = isTransfer ? LIGHT_ACCENT_COLOR_BG : 'rgb(249 250 251)';
              const cardBorderColor = isTransfer ? ACCENT_COLOR : PRIMARY_COLOR;

              return (
                <div
                  key={index}
                  className="p-5 rounded-xl shadow-md flex items-center space-x-4 border-l-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: cardBgColor, borderColor: cardBorderColor }}
                >
                  {/* Imagem do Prefeito / Avatar Placeholder */}
                  <div className="flex-shrink-0">
                    {/*
                      COMO ADICIONAR AS FOTOS DOS PREFEITOS:
                      1. A função 'getMayorPhotoSrc' agora tenta buscar a URL da imagem do prefeito na constante 'MAYOR_IMAGE_URLS'.
                      2. Se a foto não estiver em 'MAYOR_IMAGE_URLS' OU na propriedade 'photoUrl' do objeto do prefeito em 'initialData',
                         um avatar com as iniciais do nome e sobrenome será gerado automaticamente.
                      3. Para adicionar uma foto, basta incluir uma entrada na constante MAYOR_IMAGE_URLS no topo do arquivo.
                         Exemplo: "Nome do Prefeito": "URL_DA_SUA_IMAGEM.png",
                    */}
                    <img
                      src={getMayorPhotoSrc(transfer.mayor, transfer.photoUrl)}
                      alt={transfer.mayor}
                      className="w-16 h-16 rounded-full object-cover border-2"
                      style={{ borderColor: cardBorderColor }} // A borda da imagem segue a cor do card
                      onError={(e) => {
                        // Fallback para um ícone SVG genérico se a imagem não carregar
                        e.target.onerror = null; // Evita loop infinito
                        const encodedPrimaryColor = PRIMARY_COLOR.replace('#', '%23');
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodedPrimaryColor}'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 20C9.34 20 6.67 18.95 4.5 17.3L5.83 15.97C7.38 17.15 9.61 18 12 18C14.39 18 16.62 17.15 18.17 15.97L19.5 17.3C17.33 18.95 14.66 20 12 20Z'/%3E%3C/svg%3E`;
                        e.target.style.background = '#e0e0e0'; // Fundo cinza para o ícone
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-bold text-gray-900 leading-tight">{transfer.mayor}</p>
                    <p className="text-sm text-gray-600 mb-2">{transfer.city}</p>
                    <div className="flex items-center justify-start space-x-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      >
                        {transfer.oldParty}
                      </span>
                      {/* Condicionalmente exibe a seta e o novo partido */}
                      {isTransfer ? (
                        <>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                            style={{ backgroundColor: ACCENT_COLOR }}
                          >
                            {transfer.newParty}
                          </span>
                        </>
                      ) : null /* Se os partidos forem iguais, não renderiza a seta nem o novo partido */ }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Rodapé de isenção de responsabilidade sobre os dados */}
      <footer className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg mt-8 text-center text-sm text-gray-600 border-t-2 border-gray-200">
        <p className="mb-2">
          Este infográfico é uma demonstração interativa dos dados fornecidos.
        </p>
        <p className="font-semibold text-gray-700">
          Para qualquer atualização ou análise mais aprofundada, por favor, me informe!
        </p>
      </footer>
    </div>
  );
}

export default App;