//importar as configuraçoes do servidor
var app = require('./config/server.js')


// parametrizar a porta de escutar
var server = app.listen(80, ()=>{
    console.log('servidor online caraio');
})

//
var io = require('socket.io').listen(server);

app.set('io', io)
//criar a conexao por Websockets
io.on('connection',function(socket){
      console.log("usuario conectoou");

      socket.on('disconnect', function(socket){
        console.log(('usuario desconectou'));
      });
          //dialogo
      socket.on('msgParaServidor', function(data){
        socket.emit('msgParaClient',
         {apelido: data.apelido,   mensagem: data.mensagem}
       );

          socket.broadcast.emit('msgParaClient',
           {apelido: data.apelido,   mensagem: data.mensagem}
         );



          //Participantes

          if( parseInt(data.apelido_atualizado) == 0 ){
                  socket.emit(
                    'participantesParaCliente',
                   {apelido: data.apelido}
                 );

                    socket.broadcast.emit(
                      'participantesParaCliente',
                     {apelido: data.apelido}
                   );
          }
      });

});
