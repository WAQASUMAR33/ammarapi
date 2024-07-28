import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';



// Create a new customer
export async function POST(request) {
  try {
    const {
      CustomerName,
      VATNumber,
      PostalAddress,
      StreetName,
      BuildingNumber,
      Plotno,
      CitysubdivisionName,
      CityName,
      PostalZone,
      Country,
      CompanyName,
      TaxNumber,
      InvoiceNumber,
      DocumentDate,
      TaxAmount,
      TaxwithTotal
    } = await request.json();

    const newCustomer = await prisma.Invoices.create({
      data: {
        CustomerName,
        VATNumber,
        PostalAddress,
        StreetName,
        BuildingNumber,
        Plotno,
        CitysubdivisionName,
        CityName,
        PostalZone,
        Country,
        CompanyName,
        TaxNumber,
        InvoiceNumber,
        DocumentDate: new Date(),
        TaxAmount,
        TaxwithTotal,
      },
    });
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('Error creating Invoce:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Invoce',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}





// Get all customers
export async function GET() {
    try {
      const invoies = await prisma.Invoices.findMany();
      return NextResponse.json(invoies);
    } catch (error) {
      console.error('Error fetching Invoce:', error);
      return NextResponse.json(
        {
          message: 'Failed to fetch Invoce',
          status: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
