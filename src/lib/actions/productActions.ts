"use server";

import { db } from "../firebase";
import { DatabaseProduct } from "../../types/database";
import { revalidatePath } from "next/cache";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

export async function getAdminProducts() {
    try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const products = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
        })) as DatabaseProduct[];

        products.sort((a, b) => {
            const timeA = new Date(a.created_at || 0).getTime();
            const timeB = new Date(b.created_at || 0).getTime();
            return timeB - timeA;
        });

        return { data: products, error: null };
    } catch (error: any) {
        console.error("Error fetching products row:", error);
        return { error: error.message, data: null };
    }
}

export async function deleteProduct(id: string) {
    try {
        await deleteDoc(doc(db, "products", id));

        // Revalidate the admin and public product pages so the removed item disappears
        revalidatePath('/admin');
        revalidatePath('/products');

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting product:", error);
        return { error: error.message };
    }
}

export async function createProduct(productData: any) {
    try {
        const now = new Date().toISOString();
        const payload = {
            ...productData,
            created_at: now,
            updated_at: now,
        };
        const docRef = await addDoc(collection(db, "products"), payload);

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, data: [{ id: docRef.id, ...payload }] };
    } catch (error: any) {
        console.error("Error creating product:", error);
        return { error: error.message };
    }
}

export async function updateProduct(id: string, productData: any) {
    try {
        const docRef = doc(db, "products", id);
        const payload = {
            ...productData,
            updated_at: new Date().toISOString(),
        };
        await updateDoc(docRef, payload);

        revalidatePath('/admin');
        revalidatePath('/products');
        revalidatePath(`/products/${id}`);
        return { success: true, data: [{ id, ...payload }] };
    } catch (error: any) {
        console.error("Error updating product:", error);
        return { error: error.message };
    }
}
