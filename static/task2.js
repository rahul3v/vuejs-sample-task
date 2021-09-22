
// colors in hsl format
const colors = [
  {h:'5',s:'100%',l:'100%'},
  {h:'15',s:'65%',l:'65%'},
  {h:'25',s:'34%',l:'34%'},
  {h:'35',s:'43%',l:'43%'},
  {h:'45',s:'76%',l:'76%'},
]

const palette = [
  {h:'1',s:'49%',l:'49%'},
  {h:'2',s:'87%',l:'87%'},
  {h:'3',s:'63%',l:'63%'},
  {h:'4',s:'72%',l:'72%'},
]

// There are many diffrent approcah you can take, its one way
function paletteConverter(colors,palette){
	const newColor = JSON.parse(JSON.stringify(colors))
	
	// We devied it in a ratio proportion, there are many  ways though but, its one of a its kind
	const ratio = palette.length

	for(const i in newColor){
		newColor[i].h = palette[i % ratio].h
	}
	return newColor;
}
let newColors = paletteConverter(colors,palette)
console.log(newColors)