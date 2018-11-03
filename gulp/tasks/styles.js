var gulp=require('gulp'),
postcss=require('gulp-postcss'),
autoprefixer=require('autoprefixer'),
cssvars=require('postcss-simple-vars'),
nestedcss=require('postcss-nested'),
cssImport=require('postcss-import'),
mixins=require('postcss-mixins');

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/styles.css')
 	.pipe(postcss([cssImport, mixins, nestedcss, cssvars, autoprefixer]))//χρησιμοποιω array όπου θα προσθέτω τα φίλτρα που θέλω: 1. import css σε ένα main css για να είναι οργανωμενα 2. εμφολευμένη css 3.css μεταβλητές 4.autoprefixer μέσω του postcss για να φιλτράρεται το αρχικό css και όταν εισάγω css rule που χρειάζεται prefix απο άλλους browser το βγάζει αυτόματα στο αντίγραφο css.
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})//ετσι δεν θα σταματήσει το task αλλά δεν έχουμε και ενδειξη οτι υπάρχει error
	.pipe(gulp.dest('./app/temp/styles')); //με το pipe φτιάχνω ένα αντίγραφο του styles.css(src) στον φάκελο temp(dest) οπου όποτε αλλάζει το αρχικό θα αλλάζει και το αντίγραφο
	//return επειδη το gulp.src ειναι asynchronous function. Χρειάζεται η gulp να γνωρίζει ποτε το function αυτό έχει ολοκληρωθεί.
});
