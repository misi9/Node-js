class singletonPattern {
    output(value){
        console.log(`My cat is, ${value}`)
    }
}


export const singletonPatternInstance = new singletonPattern()

singletonPatternInstance.output("Lea")