// Cenários fictícios usados na demo e no teste. Nenhum dado real de cliente.
export const CENARIOS = {
  deposito: {
    titulo: "Disparo no depósito de madrugada",
    evento: {
      cliente: {
        tipo: "loja de materiais de construção",
        horario_funcionamento: "seg a sáb, 07h às 18h",
        responsavel_cadastrado: "gerente da loja",
      },
      evento: {
        tipo: "disparo de sensor de presença",
        zona: "Zona 3 - depósito dos fundos",
        data_hora: "2026-10-08T02:14:00-03:00",
      },
      sinais_adicionais: [
        "Zona 3 disparou de novo 40 segundos depois",
        "Sensor magnético da porta lateral indica porta aberta",
        "Câmera 04 cobre o depósito e está online",
      ],
      historico_zona: "Nenhum falso alarme na Zona 3 nos últimos 30 dias",
    },
  },
  recepcao: {
    titulo: "Disparo na recepção com histórico de falso alarme",
    evento: {
      cliente: {
        tipo: "clínica odontológica",
        horario_funcionamento: "seg a sex, 08h às 19h",
        responsavel_cadastrado: "sócia-administradora",
      },
      evento: {
        tipo: "disparo de sensor de presença",
        zona: "Zona 1 - recepção",
        data_hora: "2026-10-07T00:31:00-03:00",
      },
      sinais_adicionais: [
        "Disparo único, sem novos sensores nos 5 minutos seguintes",
        "Portas e janelas fechadas",
        "Ar-condicionado da recepção programado para ligar à 00h30",
      ],
      historico_zona: "6 falsos alarmes na Zona 1 em 30 dias, todos entre 00h e 01h; técnico apontou corrente de ar do ar-condicionado",
    },
  },
  energia: {
    titulo: "Câmera offline e bateria baixa",
    evento: {
      cliente: {
        tipo: "escritório de contabilidade",
        horario_funcionamento: "seg a sex, 08h às 18h",
        responsavel_cadastrado: "sócio responsável",
      },
      evento: {
        tipo: "perda de comunicação da câmera",
        zona: "Câmera 07 - corredor de entrada",
        data_hora: "2026-10-07T01:52:00-03:00",
      },
      sinais_adicionais: [
        "Central de alarme reportou falta de energia AC às 01h50",
        "Central operando na bateria",
        "Nenhum sensor de intrusão disparou",
      ],
      historico_zona: "Concessionária informou instabilidade de energia no bairro nesta noite",
    },
  },
  panico: {
    titulo: "Botão de pânico acionado no caixa",
    evento: {
      cliente: {
        tipo: "farmácia",
        horario_funcionamento: "todos os dias, 07h às 23h",
        responsavel_cadastrado: "farmacêutico responsável",
      },
      evento: {
        tipo: "acionamento de botão de pânico",
        zona: "Caixa 1",
        data_hora: "2026-10-07T21:47:00-03:00",
      },
      sinais_adicionais: [
        "Loja aberta, horário de funcionamento",
        "Ligação de verificação para a loja não foi atendida",
      ],
      historico_zona: "Nenhum acionamento de pânico anterior",
    },
  },
};
