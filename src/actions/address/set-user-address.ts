"use server";

import { Address } from "@/interfaces/address.interface";
import { prisma } from "@/lib/prisma";

export const SetUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceUserAddress(address, userId);

    return {
      ok: true,
      message: "Address saved successfully.",
      address: newAddress,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { ok: false, message: "Something went wrong." };
  }
};

const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const AddressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: AddressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: AddressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { ok: false, message: "Changes cannot be saved." };
  }
};
