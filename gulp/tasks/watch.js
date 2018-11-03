var gulp=require('gulp'),
watch=require('gulp-watch'),
browserSync=require('browser-sync').create();

gulp.task('watch',function(){

	browserSync.init({
		notify:false,
		server:{
			baseDir: "app"
		}//χρειάζεται το που βρίσκεται το site γιατι το browserSync ουσιαστικά φτιάχνει έναν μικρό web server στον υπολογιστή μου και πρέπει να ξέρει που θα δείχνει αυτός web server.
	});


	watch('./app/index.html', function(){//όποτε σόζω κάτι στο αρχείο index.html
		//gulp.start('html');//ενεργοποιώ το task html.
		browserSync.reload();//refresh τη σελίδα όταν κανω αλλαγές στο html
	});

	watch('./app/assets/styles/**/*.css', function(){//όποτε σόζω κάτι στο αρχείο styles.css ή οποιοδήποτε css αρχείο σε οποιονδήποτε φάκελο μετά τον styles
		//gulp.start('styles');//ενεργοποιώ το task styles.
		gulp.start('cssInject');//ενεργοποιώ το task cssInject το οποίο καλεί το task styles ως dependecy [styles]
	});

});

gulp.task('cssInject', ['styles'], function(){
   return gulp.src('./app/temp/styles/styles.css')//πέρνω τα δεδομένα απο το compiled css αρχείο για να τα περάσω στο browser-sync
   .pipe(browserSync.stream()); //η μέθοδος stream καθιστά τα δεδομένα αυτά διαθέσημα στον browser 
});
