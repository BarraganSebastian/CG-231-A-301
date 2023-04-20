
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setClearColor(0xffffff, 1);//Asignacion de color al escenario
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );


			//Definicion de la funcion traslacion para trasladar objetos
			function traslacion(group, pos){
				group.translateX(pos[0])
				group.translateY(pos[1])
				group.translateZ(pos[2])
				return group
			}

			//Definicion de la funcion rotacion la cual lleva al objeto al origen, lo rota y lo devuelve a la posicion inicial
			function rotacion(group,grados,posini){
				degree=[]
				pos=[-posini[0],-posini[1],-posini[2]]
				group=traslacion(group,pos)
				for(i=0;i<3;i++){
					degree[i]=(grados[i]*Math.PI)/180}
				group.rotation.set(degree[0],degree[1],degree[2])
				group=traslacion(group,posini)
				return group
				

			}


			//Definicion de variables
			l=[.2,1,.2]
			alfa=[0,0,-30]
			beta=[0,0,-30]
			gamma=[0,0,0]
			color=[{color:0xFF0000},{color:0x00FF00}]; //Arreglo que contiene los colores
			geometria=[[l[0],l[1],l[2]],[l[0],l[1],l[2]]];  //Arreglo que contiene la geometria de los objetos

			//Creacion de vectores que contienen las geometrias, materiales y objetos
			const geo=[]
			mat=[]
			obj=[]
			for(i=0;i<2;i++){
				geo.push(new THREE.BoxGeometry(geometria[i][0],geometria[i][1],geometria[i][2]));  //Asignacion de valores del vector que contiene la geometria de objetos
				mat.push(new THREE.MeshPhongMaterial(color[i]));  //Arreglo que contiene los materiales de los objetos
				obj.push(new THREE.Mesh(geo[i], mat[i]));  //Arreglo que crea los objetos con la geometria y materiales establecidos anteriormente
				
				scene.add(obj[i]);
			}
            
			//Creacion del grupo que contiene los objetos
			var brazo=new THREE.Group();
			brazo.add(obj[0]);//Añadir objetos al grupo
			brazo.add(obj[1]);
			//Aplicacion de trasnformaciones al grupo y objetos individuales
			brazo=traslacion(brazo,[-.1,.5,.1])
			brazo=rotacion(brazo,beta,[-.1,.5,.1])
			obj[1]=traslacion(obj[1],[0,1,0])
			obj[1]=rotacion(obj[1],alfa,[-.1,.5,.1])

			scene.add(brazo);

			
			var spotLight0 = new THREE.SpotLight(0xFFFFFF);  //Creacion de el foco de luz 
			spotLight0.position.set(2, 7, 7);  //Posicion del foco de luz
			spotLight0.lookAt(obj[1]);  //Punto hacia donde apunta el foco de luz
			scene.add(spotLight0);  //Añadir el foco de luz a la escena
			// Luz creada a partir de las indicaciones en "https://programmerclick.com/article/81771039238/"

            //Creacion de la malla
            const size=100;
            const divisions=100;
            const gridHelper = new THREE.GridHelper(size, divisions);
            scene.add(gridHelper);

			camera.position.z = 2;  //Ajuste de la posicion de la cámara
			camera.position.x = 2;
            camera.position.y = 2;
            
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            

			function animate() {
				requestAnimationFrame( animate );
				renderer.render( scene, camera );  //Renderizar la escena
			};

			animate();
