import { assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import * as Earthstar from "earthstar";
import { ReplicaDriverDenoKv } from "./driver_deno_kv.ts"

const shareKeypair = await Earthstar.Crypto.generateShareKeypair("roeblog");

if (Earthstar.isErr(shareKeypair)) {
	console.error(shareKeypair);
	Deno.exit(1);
}
  
Deno.test("docdriver can be closed without erasing", async (t) => {
    const  driver = new ReplicaDriverDenoKv(shareKeypair.shareAddress);

    await t.step({name: "docdriver is open", fn: () => {
        assertEquals(driver.docDriver.isClosed(), false);
    }})

    
    await t.step({name: "docdriver is closed", fn: () => {
        driver.docDriver.close(false);
        assertEquals(driver.docDriver.isClosed(), true);
    }})

});
