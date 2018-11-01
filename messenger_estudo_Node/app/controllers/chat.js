module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;

    req.assert('apelido', 'nome ou apelido obrigatorio').notEmpty();
    req.assert('apelido', 'nome ou apelido com no minio 3 e maximo 15 caracteres').len(3,15);

    const error = req.validationErrors()

      if(error){
        res.render('index', { validacao : error})
        return ;
      }

      application.get('io').emit(
        'msgParaClient',
        {apelido:  dadosForm.apelido, mensagem: 'acabou de entrar no chat'}
      )

      res.render('chat',{dadosForm: dadosForm});
  }
