<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
	    <html>
		<head>
		    <title>
			the planets table
		    </title>
		</head>
		<body>
		    <h1>
			the planets table
		    </h1>
		    <table border="2">
		        <tr>
			    <td>Name </td>
			    <td>Mass </td>
			    <td>Radius </td>
			    <td>Day </td>
		        </tr>
			<xsl:apply-templates/>
		    </table>
		</body>
	    </html>
	</xsl:template>

	<xsl:template match="planets">
	       <xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="planet">
	    <tr>
		<td><xsl:value-of select="name"/></td>
		<td><xsl:apply-templates select="mass"/></td>
		<td><xsl:apply-templates select="radius"/></td>
		<td><xsl:apply-templates select="day"/></td>
	    </tr>
	</xsl:template>


	<xsl:template match="mass">
   	    <xsl:value-of select="."/>
	    <xsl:text> </xsl:text>
	    <xsl:value-of select="@units"/>
	</xsl:template>

	<xsl:template match="radius">
   	    <xsl:value-of select="."/>
	    <xsl:text> </xsl:text>
	    <xsl:value-of select="@units"/>
	</xsl:template>

	<xsl:template match="day">
   	    <xsl:value-of select="."/>
	    <xsl:text> </xsl:text>
	    <xsl:value-of select="@units"/>
	</xsl:template>

</xsl:stylesheet>
