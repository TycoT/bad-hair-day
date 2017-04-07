import Knex from './knex';
import jwt from 'jsonwebtoken';
import GUID from 'node-uuid';

// The idea here is simple: export an array which can be then iterated over and each route can be attached. 
const routes = [
  {
    path: '/ingredients',
    method: 'GET',
    handler: ( request, reply ) => {
      // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
      const getOperation = Knex( 'ingredients' ).
      select( 'name', 'desc', 'rating', 'guid' ).then( ( results ) => {
        if( !results || results.length === 0 ) {
          reply( {
            error: true,
            errMessage: 'no public ingredient found',
          } );
        }

        reply( {
          dataCount: results.length,
          data: results,
        } );

      } ).catch( ( err ) => {
        reply( 'server-side error' );
      } );
    }
  },

  {
    path: '/ingredients',
    method: 'POST',
    handler: ( request, reply ) => {
      const { ingredient } = request.payload;
      const guid = GUID.v4();

      const insertOperation = Knex( 'ingredients' ).insert( {
        
        name: ingredient.name,
        desc: ingredient.desc,
        rating: ingredient.rating,
        guid: guid
      }).then( ( res ) => {
          reply({
            data: guid,
            message: 'successfully created ingredient'
          });
      }).catch( ( err ) => {
        reply( 'server-side error' );
      });
    }
  },

  {
    path: '/ingredients/{ingredient}',
    method: 'PUT',
    config: {
      pre: [{
        method: ( request, reply ) => {
          const { ingredientGuid } = request.params;
          console.log(request.params);

          const getOperation = Knex( 'ingredients' ).where( {
            guid: ingredientGuid,
          } ).select( 'name' ).then( ( [ result ] ) => {
            console.log(result);
            if( !result ) {
              console.log("error!!!");
              reply( {
                error: true,
                errMessage: `the ingredient with id ${ingredientGuid } was not found`
              } ).takeover();
            }
            return reply.continue();
          } )
        }
      }]
    },
    
    handler: ( request, reply ) => {
      const { ingredientGuid } = request.params
          , { ingredient }     = request.payload;

      const insertOperation = Knex( 'ingredients' ).where( {
        guid: ingredientGuid,
      } ).update( {
        name: ingredient.name,
        desc: ingredient.desc,
        rating: ingredient.rating
      } ).then( ( res ) => {
        reply( {
          message: 'successfully updated ingredient'
        } );
      } ).catch( ( err ) => {
        reply( 'server-side error' );
      } );
    }
  },

  {
    path:'/ingredients/{ingredientGuid}',
    method: 'delete',
    handler: ( request, reply ) => {
      const { ingredientGuid } = request.params;
      const deleteOperation = Knex( 'ingredients' ).where( {
        guid: ingredientGuid,
      } ).delete()
      .then( (res) => {
        reply ({
          message: 'successfuly deleted ingredient'
        });
      })
      .catch((err) => {
        reply('sever-side error');
      })
    }
  }


]
  
export default routes;